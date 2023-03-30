import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { toNumber } from '../../common/utils/transformers/to-number.transformer.util';
import { isEnvValid } from '../../common/utils/validators/is-env-valid.validator.util';

/**
 * Defines class to hold rate-limiting-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class RateLimitingEnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  THROTTLER_TTL: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  THROTTLER_LIMIT: number;
}

/**
 * Defines the rate-limiting configuration.
 * This configuration is registered as `rate-limiting` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const rateLimitingConfig = registerAs(
  'rate-limiting',
  (): ThrottlerModuleOptions => {
    const env: RateLimitingEnvironmentVariables = isEnvValid(
      process.env,
      RateLimitingEnvironmentVariables,
    );

    return {
      ttl: env.THROTTLER_TTL,
      limit: env.THROTTLER_LIMIT,
    };
  },
);
