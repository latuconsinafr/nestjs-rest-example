import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'nest-casl';
import { RolesModule } from '../roles/roles.module';
import { StoragesModule } from '../storages/storages.module';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';
import { UserPermission } from './permissions/user.permission';
import { UserByIdPipe } from './pipes/user-by-id.pipe';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * Defines the users module.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    CaslModule.forFeature({ permissions: UserPermission }),
    RolesModule,
    StoragesModule,
  ],
  providers: [UsersService, UserByIdPipe],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
