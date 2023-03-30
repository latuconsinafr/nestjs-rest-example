import { loggerConfig } from '../../logger/logger.config';
import { APP_NAME } from '../../../common/constants';
import pino from 'pino';

describe(`when ${loggerConfig.name} is registered`, () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => loggerConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      NODE_ENV: 'development',
      HOST: 'localhost',
      PORT: '8080',
      DEBUG: 'false',

      LOGGER_STREAM_DESTINATION: 'app.log',
      LOGGER_STREAM_BUFFER: '4096',
      LOGGER_STREAM_SYNC: 'false',
    };

    const parsedEnv = {
      pinoHttp: {
        name: APP_NAME,
        level: 'info',
        transport: { target: 'pino-pretty', options: { singleLine: true } },
        stream: pino.destination({
          dest: 'app.log',
          minLength: parseInt('4096', 10),
          sync: false,
        }),
        customProps: () => ({
          context: 'Http',
        }),
      },
    };

    process.env.NODE_ENV = env.NODE_ENV;
    process.env.HOST = env.HOST;
    process.env.PORT = env.PORT;
    process.env.DEBUG = env.DEBUG;

    process.env.LOGGER_STREAM_DESTINATION = env.LOGGER_STREAM_DESTINATION;
    process.env.LOGGER_STREAM_BUFFER = env.LOGGER_STREAM_BUFFER;
    process.env.LOGGER_STREAM_SYNC = env.LOGGER_STREAM_SYNC;

    // ? Finally it has to be stringified.
    // ? Since, even thou they have an equal value, the Jest keeps on telling me something like 'serializes to the same string'?
    expect(JSON.stringify(loggerConfig())).toEqual(JSON.stringify(parsedEnv));
  });
});
