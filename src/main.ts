import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { csurfMiddleware } from './common/middlewares/csurf.middleware';
import * as compression from 'compression';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { AppConfigOptions, Environment } from './config/app/app.config';
import { UnprocessableEntityException } from './common/exceptions/unprocessable-entity.exception';
import { APP_GLOBAL_PREFIX } from './common/constants';

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

  // * Logger section
  // ! The global has to use the `Logger` class, other than that has to use the `PinoLogger` class
  const logger = app.get(Logger);
  app.useLogger(logger);

  // * Global prefix & versioning section
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);
  app.enableVersioning({
    // * This versioning uses the version passed within the URL `https://example.com/v1/{route}`
    // * @see {@link https://docs.nestjs.com/techniques/versioning#uri-versioning-type}
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // * Config section
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfigOptions>('app') ?? {
    environment: Environment.Development,
    host: 'localhost',
    port: 3000,
  };

  // * CORS section
  app.enableCors();

  // * Global middleware section
  // * Note that applying helmet as global or registering it must come before other calls to app.use() or setup functions that may call app.use()
  // * @see {@link https://docs.nestjs.com/security/helmet)}
  app.use(helmet());

  // * CSURF middleware requires either session middleware or cookie-parser to be initialized first.
  // * @see {@link https://github.com/expressjs/csurf#csurf)}
  if (appConfig.environment === Environment.Production) {
    app.use(cookieParser());
    app.use(csurf({ cookie: { sameSite: true } }));
    app.use(csurfMiddleware);
  }
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

      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({}, errors);
      },
    }),
  );

  // * Global interceptor section
  app.useGlobalInterceptors(
    // new LoggingInterceptor(logger), // * Disabled, since the logger itself has calculated the request time
    new TimeoutInterceptor(),
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  await app.listen(appConfig.port, appConfig.host);
}

/**
 * Calling the application bootstrap.
 */
bootstrap();
