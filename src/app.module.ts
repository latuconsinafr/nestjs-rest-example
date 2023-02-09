import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { HttpCacheInterceptor } from './common/interceptors/http-cache.interceptor';
import { CommonServicesModule } from './common/services/common-services.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Defines the application module.
 *
 * @usageNotes
 * This app module contains module as follow:
 * - {@link ConfigModule}: The module that responsible for whole application configuration
 * - {@link CommonServicesModule}: The module contains service module(s) which used across any other module within the application
 * - {@link ServicesModule}: The module contains service module(s) which is the primary application business process
 *
 * And provides a global providers as follow:
 * - {@link HttpCacheInterceptor} Global cache interceptor
 * - {@link HttpCacheInterceptor} Global throttler guard
 */
@Module({
  imports: [ConfigModule, CommonServicesModule, ServicesModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
