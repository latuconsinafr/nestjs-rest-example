import { Module } from '@nestjs/common';
import { LoggerConfigModule } from './logger/logger-config.module';

/**
 * Defines the application configuration module.
 */
@Module({
  imports: [LoggerConfigModule],
})
export class AppConfigModule {}
