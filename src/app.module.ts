import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app-config.module';
import { UsersModule } from './services/users/users.module';

/**
 * Defines the application module.
 */
@Module({
  imports: [AppConfigModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
