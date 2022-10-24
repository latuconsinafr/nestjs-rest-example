import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { loggerMiddleware } from './middlewares/logger.middleware';

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

  await app.listen(3000);
}
bootstrap();
