import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { StoragesModule } from './storages/storages.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 *
 * @usageNotes
 * This services module contains module as follow:
 * - {@link AuthModule}: The module that responsible for authentication operations
 * - {@link UsersModule}: The module that responsible for user-related operations
 * - {@link StoragesModule}: The module that responsible for storage-related operations
 * - {@link TopicsModule}: The module that responsible for topic-related operations
 * - {@link PostsModule}: The module that responsible for post-related operations
 */
@Module({
  imports: [AuthModule, UsersModule, StoragesModule, TopicsModule, PostsModule],
})
export class ServicesModule {}
