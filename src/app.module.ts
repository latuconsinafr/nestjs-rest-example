import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { FeaturesModule } from './features/features.module';

/**
 * Defines the application module.
 */
@Module({
  imports: [ConfigModule, FeaturesModule],
  controllers: [AppController],
})
export class AppModule {}
