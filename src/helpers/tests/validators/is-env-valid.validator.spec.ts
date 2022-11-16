import { plainToClass } from 'class-transformer';
import { AppEnvironmentVariables } from '../../../config/app/app.config';
import { DatabaseEnvironmentVariables } from '../../../config/database/database.config';
import { LoggerEnvironmentVariables } from '../../../config/logger/logger.config';
import { isEnvValid } from '../../validators/is-env-valid.validator';

describe('when isEnvValid called', () => {
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

  describe('and applied on LoggerEnvironmentVariables', () => {
    it('should throw error when the supplied env is incorrect', () => {
      expect(() => isEnvValid({}, LoggerEnvironmentVariables)).toThrow(Error);
    });

    it('should return the validated environment variables when the supplied env is correct', () => {
      const env = {
        LOGGER_LEVEL: 'info',
        LOGGER_TRANSPORT: 'true',
        LOGGER_DESTINATION: './app.log',
        LOGGER_BUFFER: '4096',
      };

      const parsedEnv = {
        LOGGER_LEVEL: env.LOGGER_LEVEL,
        LOGGER_TRANSPORT: true,
        LOGGER_DESTINATION: env.LOGGER_DESTINATION,
        LOGGER_BUFFER: parseInt(env.LOGGER_BUFFER, 10),
      };

      expect(isEnvValid(env, LoggerEnvironmentVariables)).toStrictEqual(
        plainToClass(LoggerEnvironmentVariables, parsedEnv),
      );
    });
  });

  describe('and applied on DatabaseEnvironmentVariables', () => {
    it('should throw error when the supplied env is incorrect', () => {
      expect(() => isEnvValid({}, DatabaseEnvironmentVariables)).toThrow(Error);
    });

    it('should return the validated environment variables when the supplied env is correct', () => {
      const env = {
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: '3306',
        DATABASE_USERNAME: 'root',
        DATABASE_PASSWORD: '',
        DATABASE_NAME: 'db',
        DATABASE_SSL: 'false',
        DATABASE_LOGGING: 'true',
      };

      const parsedEnv = {
        DATABASE_HOST: env.DATABASE_HOST,
        DATABASE_PORT: parseInt(env.DATABASE_PORT, 10),
        DATABASE_USERNAME: env.DATABASE_USERNAME,
        DATABASE_PASSWORD: env.DATABASE_PASSWORD,
        DATABASE_NAME: env.DATABASE_NAME,
        DATABASE_SSL: false,
        DATABASE_LOGGING: true,
      };

      expect(isEnvValid(env, DatabaseEnvironmentVariables)).toEqual(
        plainToClass(DatabaseEnvironmentVariables, parsedEnv),
      );
    });
  });
});
