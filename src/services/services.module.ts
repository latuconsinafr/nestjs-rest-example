import { Module } from '@nestjs/common';
import { StoragesModule } from './storages/storages.module';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 *
 * @usageNotes
 * This services module contains module as follow:
 * - {@link StoragesModule}: The module that responsible for storage-related operations
 * - {@link UsersModule}: The module that responsible for user-related operations
 */
@Module({
  imports: [StoragesModule, UsersModule],
})
export class ServicesModule {}
