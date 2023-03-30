import { jwtConfig } from '../../auth/jwt.config';

describe(`when ${jwtConfig.name} is registered`, () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should throw error when the env is not valid', () => {
    expect(() => jwtConfig()).toThrow(Error);
  });

  it('should return the config when the env is valid', () => {
    const env = {
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN: '24h',
    };

    const parsedEnv = {
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN },
    };

    process.env.JWT_SECRET = env.JWT_SECRET;
    process.env.JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;

    expect(jwtConfig()).toStrictEqual(parsedEnv);
  });
});
