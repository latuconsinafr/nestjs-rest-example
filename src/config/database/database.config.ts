import { DataSourceOptions } from 'typeorm';

/**
 * Defines the database configuration using TypeORM.
 */
export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'personal-practice-db',
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // TODO: All process.env should be changed with config service
  logging: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : 'all',
};
