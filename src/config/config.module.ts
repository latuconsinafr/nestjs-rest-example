import {
  CacheInterceptor,
  CacheManagerOptions,
  CacheModule,
  Module,
} from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { loggerConfig } from './logger/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { databaseConfig } from './database/database.config';
import { appConfig } from './app/app.config';
import { cacheConfig } from './cache/cache.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * Defines the application configuration module.
 *
 * @usageNotes
 * This config module contains configuration as follow:
 * - {@link ConfigModule}: The nestjs ConfigModule, load configuration based on environments
 * - {@link LoggerModule}: The nestjs-pino LoggerModule, load logger configuration
 * - {@link CacheModule}: The nestjs CacheModule, load cache configuration
 * - {@link ScheduleModule}: The nestjs ScheduleModule, load task scheduling configuration
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, loggerConfig, databaseConfig, cacheConfig],
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
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<CacheManagerOptions>('cache'),
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ConfigModule {}
