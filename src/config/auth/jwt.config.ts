import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { IsNotEmpty, IsString } from 'class-validator';
import { isEnvValid } from '../../common/utils/validators/is-env-valid.validator.util';

/**
 * Defines class to hold general JWT-related environment variables.
 *
 * @see [Custom validate function](https://docs.nestjs.com/techniques/configuration#schema-validation)
 */
export class JwtEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_EXPIRES_IN: string;
}

/**
 * Defines the JWT configuration.
 * This configuration is registered under `jwt` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const jwtConfig = registerAs('jwt', (): JwtModuleOptions => {
  const env: JwtEnvironmentVariables = isEnvValid(
    process.env,
    JwtEnvironmentVariables,
  );

  return {
    secret: env.JWT_SECRET,
    signOptions: {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  };
});
