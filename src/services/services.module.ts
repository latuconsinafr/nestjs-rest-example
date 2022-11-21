import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 *
 * @usageNotes
 * This services module contains module as follow:
 * - {@link UsersModule}: The module that responsible for user-related operations
 */
@Module({
  imports: [UsersModule],
})
export class ServicesModule {}
