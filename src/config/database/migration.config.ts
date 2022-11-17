import { APP_NAME } from '../../common/constants';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { databaseConfig } from './database.config';

/**
 * Load the dot env manually without NestJS config module.
 */
config();

/**
 * Defines the migration configuration using TypeORM DataSource.
 *
 * @see [Configure TypeORM CLI and NestJs Application](https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application/74457311#74457311)
 */
export default new DataSource({
  ...databaseConfig(),
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  migrationsTableName: `${APP_NAME.replace(
    /\s+/g,
    '-',
  ).toLowerCase()}-migrations`,
});
