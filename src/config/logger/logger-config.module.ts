import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './logger.config';

/**
 * Defines the logger configuration module.
 */
@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => loggerConfig,
    }),
  ],
})
export class LoggerConfigModule {}
