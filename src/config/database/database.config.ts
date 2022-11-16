import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

/**
 * Defines the database configuration using TypeORM.
 */
export const databaseConfig = registerAs(
  'database',
  (): DataSourceOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ...(process.env.DATABASE_SSL === 'true' ||
    process.env.DATABASE_SSL === 'TRUE'
      ? { ssl: true }
      : undefined),
    logging:
      process.env.DATABASE_LOGGING === 'true' ||
      process.env.DATABASE_LOGGING === 'TRUE'
        ? 'all'
        : ['warn', 'error'],
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  }),
);
