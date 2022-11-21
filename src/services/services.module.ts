import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

/**
 * Defines the application services module.
 */
@Module({
  imports: [UsersModule],
})
export class Services {}
