import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database/database-config.module';
import { LoggerConfigModule } from './logger/logger-config.module';

/**
 * Defines the application configuration module.
 */
@Module({
  imports: [DatabaseConfigModule, LoggerConfigModule],
})
export class AppConfigModule {}
