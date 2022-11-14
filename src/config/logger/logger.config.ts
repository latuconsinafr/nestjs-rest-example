import { Params } from 'nestjs-pino';
import pino from 'pino';
import { APP_NAME } from '../../common/constants/app.constant';

/**
 * Defines the logger configuration using Pino Logger.
 */
export const loggerConfig: Params = {
  pinoHttp: {
    name: APP_NAME,
    // TODO: All process.env should be changed with config service
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty' }
        : undefined,
    // * There is a possibility of the most recently buffered log messages being lost in case of a system failure, e.g. a power cut.
    stream: pino.destination({
      dest: './app.log', // * Omit for stdout
      minLength: 4096, // * Buffer before writing
      sync: false, // * Asynchronous logging
    }),
  },
};
