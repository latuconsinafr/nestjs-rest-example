import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { Services } from './services/services.module';

/**
 * Defines the application module.
 */
@Module({
  imports: [ConfigModule, Services],
  controllers: [AppController],
})
export class AppModule {}
