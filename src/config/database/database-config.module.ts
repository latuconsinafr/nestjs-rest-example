import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';

/**
 * Defines the database configuration module.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: async () => databaseConfig }),
  ],
})
export class DatabaseConfigModule {}
