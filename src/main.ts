import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { csurfMiddleware } from './middlewares/csurf.middleware';
import * as compression from 'compression';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { UnprocessableEntityException } from './exceptions/http.exceptions';

/**
 * Defines the application bootstrapping function.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * @see {@link https://docs.nestjs.com/first-steps) documentation}
    abortOnError: false,
    // * This will force NestJS to wait for logger to be ready instead of using built-in logger on start
    bufferLogs: true,
  });

  // * Logger section
  app.useLogger(app.get(Logger));

  // * CORS section
  app.enableCors();

  // * Global middleware section
  // * Note that applying helmet as global or registering it must come before other calls to app.use() or setup functions that may call app.use()
  // * @see {@link https://docs.nestjs.com/security/helmet) documentation}
  app.use(helmet());
  // * CSURF middleware requires either session middleware or cookie-parser to be initialized first.
  // * @see {@link https://github.com/expressjs/csurf#csurf) documentation}
  if (process.env.NODE_ENV === 'production') {
    app.use(cookieParser());
    app.use(csurf({ cookie: { sameSite: true } }));
    app.use(csurfMiddleware);
  }
  // * For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx).
  app.use(compression());

  // * Global filter section
  // app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalFilters(new HttpExceptionFilter());

  // * Global pipe section
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({}, errors);
      },
    }),
  );

  // * Global interceptor section
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(),
    new CacheInterceptor(),
    new TransformInterceptor(),
  );

  await app.listen(3000);
}

/**
 * Calling the application bootstrap.
 */
bootstrap();
