import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

/**
 * Function to validate environment variables based on given environment variables class.
 * This function works as custom validate function for configuration > schema validation.
 *
 * @example
 * ```ts
 * isEnvValid(process.env, EnvironmentVariables)
 * ```
 *
 * @see [Schema Validation](https://docs.nestjs.com/techniques/configuration#schema-validation)
 *
 * @param env The environment variables from most of the time is `process.env`
 * @param envVariablesClass The class hold environment variables property
 *
 * @returns The validated environment variables.
 */
export function isEnvValid(
  env: Record<string, unknown>,
  envVariablesClass: ClassConstructor<any>,
) {
  const classedEnv = plainToClass(envVariablesClass, env, {
    // * This should be true, but there's an issue with boolean conversion
    // * @see {@link https://github.com/typestack/class-transformer/issues/306}
    // * @see {@link https://github.com/typestack/class-validator/issues/1559}
    enableImplicitConversion: false,
  });

  const errors = validateSync(classedEnv, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return classedEnv;
}
