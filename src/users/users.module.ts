import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
