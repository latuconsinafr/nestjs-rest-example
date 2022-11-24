import { databaseConfig } from '../../database/database.config';

describe('when databaseConfig is registered', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => databaseConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      NODE_ENV: 'development',
      HOST: 'localhost',
      PORT: '8080',
      DEBUG: 'true',

      DATABASE_HOST: 'localhost',
      DATABASE_PORT: '3306',
      DATABASE_USERNAME: 'root',
      DATABASE_PASSWORD: '',
      DATABASE_NAME: 'db',
      DATABASE_SSL: 'false',
    };

    const parsedEnv = {
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT, 10),
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      logging: 'all',
    };

    process.env.DATABASE_HOST = env.DATABASE_HOST;
    process.env.DATABASE_PORT = env.DATABASE_PORT;
    process.env.DATABASE_USERNAME = env.DATABASE_USERNAME;
    process.env.DATABASE_PASSWORD = env.DATABASE_PASSWORD;
    process.env.DATABASE_NAME = env.DATABASE_NAME;
    process.env.DATABASE_SSL = env.DATABASE_SSL;

    process.env.NODE_ENV = env.NODE_ENV;
    process.env.HOST = env.HOST;
    process.env.PORT = env.PORT;
    process.env.DEBUG = env.DEBUG;

    expect(databaseConfig()).toMatchObject(parsedEnv);
  });
});
