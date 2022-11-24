import { loggerConfig } from '../../logger/logger.config';
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
      NODE_ENV: 'development',
      HOST: 'localhost',
      PORT: '8080',
      DEBUG: 'false',
    };

    const parsedEnv = {
      pinoHttp: {
        name: APP_NAME,
        level: 'info',
        transport: { target: 'pino-pretty', options: { singleLine: true } },
      },
    };

    process.env.NODE_ENV = env.NODE_ENV;
    process.env.HOST = env.HOST;
    process.env.PORT = env.PORT;
    process.env.DEBUG = env.DEBUG;

    // ? Finally it has to be stringified.
    // ? Since, even thou they have an equal value, the Jest keeps on telling me something like 'serializes to the same string'?
    expect(JSON.stringify(loggerConfig())).toEqual(JSON.stringify(parsedEnv));
  });
});
