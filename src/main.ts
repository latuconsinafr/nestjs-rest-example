import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ExcludeNullInterceptor } from './interceptors/exclude-null.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * Reference: https://docs.nestjs.com/first-steps
    abortOnError: false,
  });

  // * Global middleware
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
