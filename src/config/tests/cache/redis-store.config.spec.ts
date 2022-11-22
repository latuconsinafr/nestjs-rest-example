import { redisStoreConfig } from '../../cache/redis-store.config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { redisStore } from 'cache-manager-redis-store';
import { mockedCacheManagerRedisStore } from '../../../common/module-utils/utils/mocks/cache-manager-redis-store.mock';

describe('when redisStoreConfig is registered', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => redisStoreConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      REDIS_HOST: 'localhost',
      REDIS_PORT: '3783',
    };

    process.env.REDIS_HOST = env.REDIS_HOST;
    process.env.REDIS_PORT = env.REDIS_PORT;

    const parsedEnv = {
      socket: {
        host: env.REDIS_HOST,
        port: parseInt(env.REDIS_PORT),
      },
    };

    mockedCacheManagerRedisStore.redisStore = jest
      .fn()
      .mockResolvedValue(parsedEnv);
    (redisStore as jest.Mock) = mockedCacheManagerRedisStore.redisStore;

    expect(redisStoreConfig()).toStrictEqual(parsedEnv);
  });
});
