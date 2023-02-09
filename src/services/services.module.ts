import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StoragesModule } from './storages/storages.module';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 *
 * @usageNotes
 * This services module contains module as follow:
 * - {@link AuthModule}: The module that responsible for authentication operations
 * - {@link UsersModule}: The module that responsible for user-related operations
 * - {@link StoragesModule}: The module that responsible for storage-related operations
 */
@Module({
  imports: [AuthModule, UsersModule, StoragesModule],
})
export class ServicesModule {}
