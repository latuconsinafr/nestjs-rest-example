import { cacheConfig } from '../../cache/cache.config';

describe('when cacheConfig is registered', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => cacheConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      CACHE_TTL: '5',
      CACHE_MAX: '10',
    };

    const parsedEnv = {
      ttl: parseInt(env.CACHE_TTL, 10),
      max: parseInt(env.CACHE_MAX, 10),
    };

    process.env.CACHE_TTL = env.CACHE_TTL;
    process.env.CACHE_MAX = env.CACHE_MAX;

    expect(cacheConfig()).toStrictEqual(parsedEnv);
  });
});
