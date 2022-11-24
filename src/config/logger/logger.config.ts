import { APP_NAME } from '../../common/constants';
import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { appConfig, Environment } from '../app/app.config';

/**
 * Defines the logger configuration using Pino Logger.
 * This configuration is registered as `logger` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const loggerConfig = registerAs('logger', (): Params => {
  const appConfigOptions = appConfig();

  return {
    pinoHttp: {
      name: APP_NAME,
      level: appConfigOptions.debug ? 'debug' : 'info',
      transport:
        appConfigOptions.environment !== Environment.Production
          ? { target: 'pino-pretty', options: { singleLine: true } }
          : undefined,
    },
  };
});
