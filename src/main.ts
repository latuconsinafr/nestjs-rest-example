import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // * Platform based on express
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // * Make it throw an error instead exit with the code 1
    // * Reference: https://docs.nestjs.com/first-steps
    abortOnError: false,
  });
  await app.listen(3000);
}
bootstrap();
