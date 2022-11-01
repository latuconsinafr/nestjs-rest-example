import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './logger.config';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => loggerConfig,
    }),
  ],
})
export class LoggerConfigModule {}
