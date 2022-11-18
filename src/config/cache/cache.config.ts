import { CacheManagerOptions } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { toNumber } from '../../common/module-utils/utils/transformers/to-number.transformer.util';
import { isEnvValid } from '../../common/module-utils/utils/validators/is-env-valid.validator.util';

/**
 * Defines class to hold general cache-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class CacheEnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  CACHE_TTL: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  CACHE_MAX: number;
}

/**
 * Defines the cache configuration.
 * This configuration is registered under `cache` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const cacheConfig = registerAs('cache', (): CacheManagerOptions => {
  const env: CacheEnvironmentVariables = isEnvValid(
    process.env,
    CacheEnvironmentVariables,
  );

  return {
    ttl: env.CACHE_TTL,
    max: env.CACHE_MAX,
  };
});
