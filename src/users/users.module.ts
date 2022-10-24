import { Module } from '@nestjs/common';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, UserByIdPipe],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
