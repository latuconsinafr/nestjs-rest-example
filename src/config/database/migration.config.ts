import { DataSource } from 'typeorm';
import { APP_NAME } from '../../common/constants/app.constant';
import { databaseConfig } from './database.config';

/**
 * Defines the migration configuration using TypeORM DataSource.
 */
export default new DataSource({
  ...databaseConfig,
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  migrationsTableName: `${APP_NAME.replace(
    /\s+/g,
    '-',
  ).toLowerCase()}-migrations`,
});
