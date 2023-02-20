import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as compression from 'compression';
import { useContainer, ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { AppConfigOptions, Environment } from './config/app/app.config';
import { UnprocessableEntityException } from './common/exceptions/unprocessable-entity.exception';
import {
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,
  APP_AUTHOR_NAME,
  APP_AUTHOR_URL,
  APP_TERMS_OF_SERVICE,
  APP_AUTHOR_EMAIL,
} from './common/constants';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorCode } from './common/enums/http/error-code.enum';

/**
 * Defines the application bootstrapping function.
 */
async function bootstrap() {
  // * App module section
  const app = await NestFactory.create(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * @see {@link https://docs.nestjs.com/first-steps) documentation}
    abortOnError: false,
    // * This will force NestJS to wait for logger to be ready instead of using built-in logger on start
    bufferLogs: true,
  });

  // * Class-validator provides very handy useContainer function, which allow to set the container to be used by class-validator library.
  // * @see {@link https://github.com/typestack/class-validator#using-service-container}
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // * Config section
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfigOptions>('app') ?? {
    environment: Environment.Development,
    host: 'localhost',
    port: 3000,
  };

  // * Logger section
  // ! The global has to use the `Logger` class, other than that has to use the `PinoLogger` class
  const logger = app.get(Logger);
  app.useLogger(logger);

  // * Global prefix & versioning section
  // app.setGlobalPrefix(APP_GLOBAL_PREFIX);
  app.enableVersioning({
    // * This versioning uses the version passed within the URL `https://example.com/v1/{route}`
    // * @see {@link https://docs.nestjs.com/techniques/versioning#uri-versioning-type}
    type: VersioningType.URI,
  });

  // * CORS section
  app.enableCors();

  // * Global middleware section
  // * Note that applying helmet as global or registering it must come before other calls to app.use() or setup functions that may call app.use()
  // * @see {@link https://docs.nestjs.com/security/helmet}
  app.use(helmet());

  // * When using openapi and helmet, there may be a problem with CSP
  // * @see {@link https://docs.nestjs.com/openapi/introduction}
  // app.register(
  // helmet,
  // {
  //   contentSecurityPolicy: false, // * If not use CSP at all
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: [`'self'`],
  //       styleSrc: [`'self'`, `'unsafe-inline'`],
  //       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //     },
  //   },
  // },
  // );

  // * CSURF middleware requires either session middleware or cookie-parser to be initialized first.
  // * @see {@link https://github.com/expressjs/csurf#csurf)}
  // * Disabled, except the application using session or cookies
  // if (appConfig.environment === Environment.Production) {
  //   app.use(cookieParser());
  //   app.use(csurf({ cookie: { sameSite: true } }));
  //   app.use(csurfMiddleware);
  // }
  // app.use(loggerMiddleware); // * Disabled, since the app using automatic logging from pino

  // * For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx).
  app.use(compression());

  // * Global filter section
  // app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // * Global pipe section
  app.useGlobalPipes(
    new ValidationPipe({
      // * Some production environments prefer to disable detailed errors
      disableErrorMessages: appConfig.environment === Environment.Production,

      // * To filter out properties that should not be received by the method handler
      // * @see {@link https://docs.nestjs.com/techniques/validation#stripping-properties}
      whitelist: true,

      // * Payloads coming in over the network are plain JavaScript objects
      // * If this set to true, it will automatically transform payloads to be objects typed according to their DTO classes.
      // * @see {@link https://docs.nestjs.com/techniques/validation#transform-payload-objects}
      transform: true,

      // * This option has to be default (default -> true) somewhere near the future for security's sake (to prevent sql injection, xss attacks, etc)
      // * The break changes with 0.14.0 class-validator version makes the default forbidUnknownValues to true, which is raised the "an unknown value was passed to the validate function" error
      // * @see {@link https://github.com/nestjs/nest/issues/10683 issue}
      // forbidUnknownValues: true,

      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          { error: ErrorCode.ErrorInputValidation },
          errors,
        );
      },
    }),
  );

  // * Global interceptor section
  app.useGlobalInterceptors(
    // new LoggingInterceptor(logger), // * Disabled, since the pino logger itself has calculated the request time
    new TimeoutInterceptor(app.get(Reflector)),
    new TransformInterceptor(app.get(Reflector)),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // * Open API section
  SwaggerModule.setup(
    `docs/v${APP_VERSION}`,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(APP_DESCRIPTION)
        .setVersion(`${APP_VERSION}.0`)
        .setTermsOfService(APP_TERMS_OF_SERVICE)
        .setContact(APP_AUTHOR_NAME, APP_AUTHOR_URL, APP_AUTHOR_EMAIL)
        .addBearerAuth({
          // * According to {@link https://stackoverflow.com/questions/68808863/nestjs-swagger-does-not-set-authorization-headers}
          // * Also was tested without prefix 'Bearer ' before the token
          description: `Please enter token in following format: Bearer [token]`,
          name: 'Authorization',
          bearerFormat: 'Bearer', // * Tested not to use this field, but the result was the same
          scheme: 'Bearer',
          type: 'http', // * Attempted type: 'apiKey' too
          in: 'Header',
        })
        .build(),
    ),
  );

  await app.listen(appConfig.port, appConfig.host);
}

/**
 * Calling the application bootstrap.
 */
bootstrap();
