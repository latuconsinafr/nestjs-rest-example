import { UnprocessableEntityException } from '../../../exceptions/unprocessable-entity.exception';

/**
 * Defines transformer to transform incoming value (most of the incoming value is string),
 * to its respective boolean type, (ex: 'true' are transformer into true).
 *
 * @example
 * ```ts
 * ...
 * `@IsNotEmpty()`
 * `@IsBoolean()`
 * `@Transform(({ value }) => toBoolean(value))`
 * DEBUG: boolean;
 * ...
 * ```
 *
 * @param value The incoming value
 *
 * @returns The boolean-ed value.
 */
export function toBoolean(value: unknown): boolean {
  if (isTrue(value)) {
    return true;
  }
  if (isFalse(value)) {
    return false;
  }

  throw new UnprocessableEntityException({
    message: 'Unable to parse value to boolean',
  });
}

/**
 * @param value current value to be processed
 * @returns `true` if `value` is said 'true', ie., if it is equal to the boolean
 * `true` or the string `"true"`
 */
function isTrue(value: unknown): boolean {
  return value === true || value === 'true';
}

/**
 * @param value current value to be processed
 * @returns `true` if `value` is said 'false', ie., if it is equal to the boolean
 * `false` or the string `"false"`
 */
function isFalse(value: unknown): boolean {
  return value === false || value === 'false';
}
