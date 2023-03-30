import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { StoragesModule } from '../storages/storages.module';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { UserPermissions } from './permissions/user.permissions';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IsEmailUniqueValidator } from './validators/is-email-unique-validator';
import { IsPhoneNumberUniqueValidator } from './validators/is-phone-number-unique.validator';
import { IsUserExistValidator } from './validators/is-user-exist.validator';
import { IsUsernameUniqueValidator } from './validators/is-username-unique.validator';

/**
 * Defines the users module.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    CaslModule.forFeature({ permissions: UserPermissions }),
    StoragesModule,
  ],
  providers: [
    UsersService,
    UserByIdPipe,

    IsUserExistValidator,
    IsUsernameUniqueValidator,
    IsEmailUniqueValidator,
    IsPhoneNumberUniqueValidator,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
