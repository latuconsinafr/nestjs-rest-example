import { rateLimitingConfig } from '../../rate-limiting/rate-limiting.config';

describe(`when ${rateLimitingConfig.name} is registered`, () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => rateLimitingConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      THROTTLER_TTL: '60',
      THROTTLER_LIMIT: '100',
    };

    const parsedEnv = {
      ttl: parseInt(env.THROTTLER_TTL, 10),
      limit: parseInt(env.THROTTLER_LIMIT, 10),
    };

    process.env.THROTTLER_TTL = env.THROTTLER_TTL;
    process.env.THROTTLER_LIMIT = env.THROTTLER_LIMIT;

    expect(rateLimitingConfig()).toStrictEqual(parsedEnv);
  });
});
