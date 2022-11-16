import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

/**
 * Defines the application features module.
 */
@Module({
  imports: [UsersModule],
})
export class FeaturesModule {}
