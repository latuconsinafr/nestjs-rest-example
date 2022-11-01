import { Module } from '@nestjs/common';
import { LoggerConfigModule } from './logger/logger-config.module';

@Module({
  imports: [LoggerConfigModule],
})
export class AppConfigModule {}
