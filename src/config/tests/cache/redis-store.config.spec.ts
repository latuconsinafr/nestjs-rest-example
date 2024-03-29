import { redisStoreConfig } from '../../cache/redis-store.config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { redisStore } from 'cache-manager-redis-store';
import { mockedCacheManagerRedisStore } from '../../../common/utils/mocks/cache-manager-redis-store/cache-manager-redis-store.mock';

describe(`when ${redisStoreConfig.name} is registered`, () => {
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
      REDIS_STORE_HOST: 'localhost',
      REDIS_STORE_PORT: '3783',
    };

    process.env.REDIS_STORE_HOST = env.REDIS_STORE_HOST;
    process.env.REDIS_STORE_PORT = env.REDIS_STORE_PORT;

    const parsedEnv = {
      socket: {
        host: env.REDIS_STORE_HOST,
        port: parseInt(env.REDIS_STORE_PORT),
      },
    };

    mockedCacheManagerRedisStore.redisStore.mockResolvedValue(parsedEnv);
    (redisStore as jest.Mock) = mockedCacheManagerRedisStore.redisStore;

    expect(redisStoreConfig()).toStrictEqual(parsedEnv);
  });
});
