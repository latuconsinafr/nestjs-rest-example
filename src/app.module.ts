import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MiddlewaresModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
