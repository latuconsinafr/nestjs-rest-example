import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonServicesModule } from './common/services/common-services.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';

/**
 * Defines the application module.
 *
 * @usageNotes
 * This app module contains module as follow:
 * - {@link ConfigModule}: The module that responsible for whole application configuration
 * - {@link CommonServicesModule}: The module contains service module(s) which used across any other module within the application
 * - {@link ServicesModule}: The module contains service module(s) which is the primary application business process
 */
@Module({
  imports: [ConfigModule, CommonServicesModule, ServicesModule],
  controllers: [AppController],
})
export class AppModule {}
