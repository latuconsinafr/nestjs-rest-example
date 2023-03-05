import { plainToClass } from 'class-transformer';
import { AppEnvironmentVariables } from '../../../../../config/app/app.config';
import { isEnvValid } from '../../../../utils/validators/is-env-valid.validator.util';

describe(`when ${isEnvValid.name} called`, () => {
  describe('and applied on AppEnvironmentVariables', () => {
    it('should throw error when the supplied env is incorrect', () => {
      expect(() => isEnvValid({}, AppEnvironmentVariables)).toThrow(Error);
    });

    it('should return the validated environment variables when the supplied env is correct', () => {
      const env = {
        NODE_ENV: 'development',
        HOST: 'localhost',
        PORT: '8080',
        DEBUG: 'false',
      };

      const parsedEnv = {
        NODE_ENV: env.NODE_ENV,
        HOST: env.HOST,
        PORT: parseInt(env.PORT, 10),
        DEBUG: false,
      };

      expect(isEnvValid(env, AppEnvironmentVariables)).toStrictEqual(
        plainToClass(AppEnvironmentVariables, parsedEnv),
      );
    });
  });
});
