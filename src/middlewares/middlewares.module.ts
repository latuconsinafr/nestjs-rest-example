import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { loggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes(UsersController);
  }
}
