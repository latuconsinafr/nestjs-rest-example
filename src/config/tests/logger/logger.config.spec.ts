import { loggerConfig } from '../../logger/logger.config';
import pino from 'pino';
import { APP_NAME } from '../../../common/constants';

describe('when loggerConfig is registered', () => {
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
      LOGGER_LEVEL: 'info',
      LOGGER_TRANSPORT: 'true',
      LOGGER_DESTINATION: './app.log',
      LOGGER_BUFFER: '4096',
    };

    const parsedEnv = {
      pinoHttp: {
        name: APP_NAME,
        level: env.LOGGER_LEVEL,
        transport: { target: 'pino-pretty' },
        stream: pino.destination({
          dest: env.LOGGER_DESTINATION,
          minLength: parseInt(env.LOGGER_BUFFER, 10),
        }),
      },
    };

    process.env.LOGGER_LEVEL = env.LOGGER_LEVEL;
    process.env.LOGGER_TRANSPORT = env.LOGGER_TRANSPORT;
    process.env.LOGGER_DESTINATION = env.LOGGER_DESTINATION;
    process.env.LOGGER_BUFFER = env.LOGGER_BUFFER;

    // ? Finally it has to be stringified.
    // ? Since, even thou they have an equal value, the Jest keeps on telling me something like 'serializes to the same string'?
    expect(JSON.stringify(loggerConfig())).toEqual(JSON.stringify(parsedEnv));
  });
});
