import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database/database.config';

/**
 * Load the dot env manually without NestJS config module.
 */
config();

/**
 * Defines the TypeORM DataSource.
 *
 * @see [Configure TypeORM CLI and NestJs Application](https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application/74457311#74457311)
 */
export default new DataSource({
  ...databaseConfig(),
});
