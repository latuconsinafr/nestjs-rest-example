import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { toBoolean } from '../../helpers/transformers/to-boolean.transformer';
import { toNumber } from '../../helpers/transformers/to-number.transformer';
import { isEnvValid } from '../../helpers/validators/is-env-valid.validator';

/**
 * Defines enum for application environment.
 */
export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Provision = 'provision',
  Test = 'test',
}

/**
 * Defines interface for application configuration options.
 */
export interface AppConfigOptions {
  environment: Environment;
  host: string;
  port: number;
  debug: boolean;
}

/**
 * Defines class to hold general app-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class AppEnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  HOST: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  PORT: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  DEBUG: boolean;
}

/**
 * Defines the app configuration.
 * This configuration is registered under `app` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const appConfig = registerAs('app', (): AppConfigOptions => {
  const env: AppEnvironmentVariables = isEnvValid(
    process.env,
    AppEnvironmentVariables,
  );

  return {
    environment: env.NODE_ENV as Environment,
    host: env.HOST,
    port: env.PORT,
    debug: env.DEBUG,
  };
});
