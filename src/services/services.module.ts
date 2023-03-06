import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { StoragesModule } from './storages/storages.module';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 *
 * @usageNotes
 * This services module contains module as follow:
 * - {@link AuthModule}: The module that responsible for authentication operations
 * - {@link RolesModule}: The module that responsible for role-related operations
 * - {@link UsersModule}: The module that responsible for user-related operations
 * - {@link StoragesModule}: The module that responsible for storage-related operations
 * - {@link PostsModule}: The module that responsible for post-related operations
 */
@Module({
  imports: [AuthModule, RolesModule, UsersModule, StoragesModule, PostsModule],
})
export class ServicesModule {}
