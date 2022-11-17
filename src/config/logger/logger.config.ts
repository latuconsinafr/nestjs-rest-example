import { APP_NAME } from '../../common/constants';
import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import pino from 'pino';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isEnvValid } from '../../common/module-utils/utils/validators/is-env-valid.validator.util';
import { Transform } from 'class-transformer';
import { toNumber } from '../../common/module-utils/utils/transformers/to-number.transformer.util';
import { toBoolean } from '../../common/module-utils/utils/transformers/to-boolean.transformer.util';

/**
 * Defines class to hold logger-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class LoggerEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  LOGGER_LEVEL: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  LOGGER_TRANSPORT: boolean;

  @IsNotEmpty()
  @IsString()
  LOGGER_DESTINATION: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  LOGGER_BUFFER: number;
}

/**
 * Defines the logger configuration using Pino Logger.
 * This configuration is registered as `logger` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const loggerConfig = registerAs('logger', (): Params => {
  const env: LoggerEnvironmentVariables = isEnvValid(
    process.env,
    LoggerEnvironmentVariables,
  );

  return {
    pinoHttp: {
      name: APP_NAME,
      level: env.LOGGER_LEVEL,
      transport: env.LOGGER_TRANSPORT ? { target: 'pino-pretty' } : undefined,
      stream: pino.destination({
        dest: env.LOGGER_DESTINATION,
        minLength: env.LOGGER_BUFFER,
      }),
    },
  };
});
