import { UnprocessableEntityException } from '../../exceptions/http.exceptions';

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
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;

  throw new UnprocessableEntityException({
    message: 'Unable to parse value to boolean',
  });
}
