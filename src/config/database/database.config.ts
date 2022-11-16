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
import { toBoolean } from '../../helpers/transformers/to-boolean.transformer';
import { toNumber } from '../../helpers/transformers/to-number.transformer';
import { isEnvValid } from '../../helpers/validators/is-env-valid.validator';

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

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  DATABASE_LOGGING: boolean;
}

/**
 * Defines the database configuration using TypeORM.
 * This configuration is registered under `database` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const databaseConfig = registerAs('database', (): DataSourceOptions => {
  const env: DatabaseEnvironmentVariables = isEnvValid(
    process.env,
    DatabaseEnvironmentVariables,
  );

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
    logging: env.DATABASE_LOGGING ? 'all' : ['warn', 'error'],
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  };
});
