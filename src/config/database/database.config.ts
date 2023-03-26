import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DataSourceOptions } from 'typeorm';
import { APP_NAME } from '../../common/constants';
import { toBoolean } from '../../common/utils/transformers/to-boolean.transformer.util';
import { toNumber } from '../../common/utils/transformers/to-number.transformer.util';
import { isEnvValid } from '../../common/utils/validators/is-env-valid.validator.util';
import { appConfig, Environment } from '../app/app.config';
import { SeederOptions } from 'typeorm-extension';

/**
 * Defines class to hold database-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class DatabaseEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  DATABASE_PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;

  @IsDefined()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  DATABASE_SSL: boolean;
}

/**
 * Defines the database configuration using TypeORM.
 * This configuration is registered under `database` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const databaseConfig = registerAs(
  'database',
  (): DataSourceOptions & SeederOptions => {
    const env: DatabaseEnvironmentVariables = isEnvValid(
      process.env,
      DatabaseEnvironmentVariables,
    );

    const appConfigOptions = appConfig();

    return {
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      ...(env.DATABASE_SSL
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : undefined),
      logging: appConfigOptions.debug
        ? 'all'
        : appConfigOptions.environment !== Environment.Production
        ? ['migration', 'query', 'warn', 'error']
        : ['warn', 'error'],
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
      migrationsTableName: `${APP_NAME.replace(
        /\s+/g,
        '-',
      ).toLowerCase()}-migrations`,
      seeds: [
        'src/database/seeds/user.seeder.ts',
        'src/database/seeds/local-file.seeder.ts',
        'src/database/seeds/user-profile.seeder.ts',
        'src/database/seeds/topic.seeder.ts',
        'src/database/seeds/post.seeder.ts',
        // 'src/database/seeds/**/*{.ts,.js}', // * Disabled due to specify the order of seeds
      ],
      factories: ['src/database/factories/**/*{.ts,.js}'],
    };
  },
);
