import { APP_NAME } from '../../common/constants/app.constant';
import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import pino from 'pino';

/**
 * Defines the logger configuration using Pino Logger.
 */
export const loggerConfig = registerAs(
  'logger',
  (): Params => ({
    pinoHttp: {
      name: APP_NAME,
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty' }
          : undefined,
      stream: pino.destination({
        dest: process.env.LOG_DESTINATION || './app.log',
        minLength: parseInt(process.env.LOG_BUFFER ?? '4096', 10),
      }),
    },
  }),
);
