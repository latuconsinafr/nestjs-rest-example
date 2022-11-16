import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { loggerConfig } from './logger/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { databaseConfig } from './database/database.config';

/**
 * Defines the application configuration module.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [loggerConfig, databaseConfig],
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<Params>('logger'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<DataSourceOptions>('database'),
      }),
    }),
  ],
})
export class ConfigModule {}
