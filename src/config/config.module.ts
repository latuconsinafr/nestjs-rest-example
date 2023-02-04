import {
  CacheManagerOptions,
  CacheModule,
  CacheStore,
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
import { ScheduleModule } from '@nestjs/schedule';
import { redisStore } from 'cache-manager-redis-store';
import { redisStoreConfig } from './cache/redis-store.config';
import { RedisClientOptions } from 'redis';
import { localFileUploadConfig } from './file-upload/local-file-upload.config';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { jwtConfig } from './auth/jwt.config';

/**
 * Defines the application configuration module.
 *
 * @usageNotes
 * This config module contains configuration as follow:
 * - {@link ConfigModule}: The nestjs ConfigModule, load configuration based on environments
 * - {@link LoggerModule}: The nestjs-pino LoggerModule, load logger configuration
 * - {@link TypeOrmModule}: The nestjs-typeORM TypeORMModule, load database configuration
 * - {@link CacheModule}: The nestjs CacheModule, load cache configuration
 * - {@link ScheduleModule}: The nestjs ScheduleModule, load task scheduling configuration
 * - {@link MulterModule}: The nestjs MulterModule, load local file upload configuration
 * - {@link JwtModule}: The nestjs-jwt JwtModule, load JWT configuration
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [
        appConfig,
        loggerConfig,
        databaseConfig,
        cacheConfig,
        redisStoreConfig,
        localFileUploadConfig,
        jwtConfig,
      ],
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
        store: (await redisStore({
          ...configService.get<RedisClientOptions>('redis-store'),
          ...configService.get<CacheManagerOptions>('cache'),
        })) as unknown as CacheStore,
        ...configService.get<CacheManagerOptions>('cache'),
      }),
    }),
    ScheduleModule.forRoot(),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<MulterOptions>('local-file-upload'),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<JwtModuleOptions>('jwt'),
      }),
    }),
  ],
})
export class ConfigModule {}
