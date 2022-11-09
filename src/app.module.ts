import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app-config.module';
import { ServicesModule } from './services/services.module';

/**
 * Defines the application module.
 */
@Module({
  imports: [AppConfigModule, ServicesModule],
  controllers: [AppController],
})
export class AppModule {}
