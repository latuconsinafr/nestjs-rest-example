import { APP_NAME } from '../../common/constants/app.constant';
import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import pino from 'pino';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isEnvValid } from '../../helpers/validators/is-env-valid.validator';
import { Transform } from 'class-transformer';
import { toNumber } from '../../helpers/transformers/to-number.transformer';
import { toBoolean } from '../../helpers/transformers/to-boolean.transformer';

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
