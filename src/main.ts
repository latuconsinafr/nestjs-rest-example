import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * Reference: https://docs.nestjs.com/first-steps
    abortOnError: false,
  });

  // * Global middleware
  // app.use(loggerMiddleware);

  await app.listen(3000);
}
bootstrap();
