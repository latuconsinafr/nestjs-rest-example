import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config/app-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AppConfigModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
