import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * Defines the users module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserByIdPipe],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
