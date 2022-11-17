import { appConfig } from '../../app/app.config';

describe('when appConfig is registered', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => appConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      NODE_ENV: 'development',
      HOST: 'localhost',
      PORT: '8080',
      DEBUG: 'false',
    };

    const parsedEnv = {
      environment: env.NODE_ENV,
      host: env.HOST,
      port: parseInt(env.PORT, 10),
      debug: false,
    };

    process.env.NODE_ENV = env.NODE_ENV;
    process.env.HOST = env.HOST;
    process.env.PORT = env.PORT;
    process.env.DEBUG = env.DEBUG;

    expect(appConfig()).toStrictEqual(parsedEnv);
  });
});
