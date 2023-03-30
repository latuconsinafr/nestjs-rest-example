import { APP_NAME } from '../../common/constants';
import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { appConfig, Environment } from '../app/app.config';
import pino from 'pino';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { toBoolean } from '../../common/utils/transformers/to-boolean.transformer.util';
import { toNumber } from '../../common/utils/transformers/to-number.transformer.util';
import { isEnvValid } from '../../common/utils/validators/is-env-valid.validator.util';
import { join } from 'path';

/**
 * Defines class to hold logger-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class LoggerEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  LOGGER_STREAM_DESTINATION: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  LOGGER_STREAM_BUFFER: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => toBoolean(value))
  LOGGER_STREAM_SYNC: boolean;
}

/**
 * Defines the logger configuration under nestjs-pino.
 * This configuration is registered as `logger` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const loggerConfig = registerAs('logger', (): Params => {
  const env: LoggerEnvironmentVariables = isEnvValid(
    process.env,
    LoggerEnvironmentVariables,
  );

  const appConfigOptions = appConfig();

  return {
    pinoHttp: {
      name: APP_NAME,
      level: appConfigOptions.debug ? 'debug' : 'info',
      transport:
        appConfigOptions.environment !== Environment.Production
          ? {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            }
          : undefined,
      stream: pino.destination({
        dest: join(process.cwd(), env.LOGGER_STREAM_DESTINATION),
        minLength: env.LOGGER_STREAM_BUFFER,
        sync: env.LOGGER_STREAM_SYNC,
      }),
      customProps: /* istanbul ignore next */ () => ({
        context: 'Http',
      }),
    },
  };
});
