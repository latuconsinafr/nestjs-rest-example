import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RedisClientOptions } from 'redis';
import { toNumber } from '../../common/module-utils/utils/transformers/to-number.transformer.util';
import { isEnvValid } from '../../common/module-utils/utils/validators/is-env-valid.validator.util';

/**
 * Defines class to hold redis-store-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class RedisStoreEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  REDIS_PORT: number;
}

/**
 * Defines the redis store configuration.
 * This configuration is registered under `redis-store` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const redisStoreConfig = registerAs(
  'redis-store',
  (): RedisClientOptions => {
    const env: RedisStoreEnvironmentVariables = isEnvValid(
      process.env,
      RedisStoreEnvironmentVariables,
    );

    return {
      socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
      },
    };
  },
);
