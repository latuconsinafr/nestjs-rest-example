import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ExcludeNullInterceptor } from './interceptors/exclude-null.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * Reference: https://docs.nestjs.com/first-steps
    abortOnError: false,
    // * This will force NestJS to wait for logger to be ready instead of using built-in logger on start
    bufferLogs: true,
  });

  // * CORS
  app.enableCors();

  // * Logger
  app.useLogger(app.get(Logger));

  // * Global middleware
  // * Note that applying helmet as global or registering it must come before other calls to app.use() or setup functions that may call app.use()
  // * Reference: https://docs.nestjs.com/security/helmet
  app.use(helmet());
  app.use(cookieParser());
  // * This middleware requires either session middleware or cookie-parser to be initialized first. Please see that documentation for further instructions.
  app.use(csurf());
  // * For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx).
  app.use(compression());
  // app.use(loggerMiddleware);

  // * Global filter
  // app.useGlobalFilters(new HttpExceptionFilter());

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // * Global pipe
  app.useGlobalPipes(new ValidationPipe());

  // * Global interceptor
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new CacheInterceptor(),
    new TransformInterceptor(),
    new ExcludeNullInterceptor(),
    new ErrorsInterceptor(),
    new TimeoutInterceptor(),
  );

  await app.listen(3000);
}
bootstrap();
