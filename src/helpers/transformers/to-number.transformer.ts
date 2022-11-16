import { UnprocessableEntityException } from '../../exceptions/http.exceptions';

/**
 * Defines transformer to transform incoming value (most of the incoming value is string),
 * to its respective number type, (ex: '1' are transformer into 1).
 *
 * @example
 * ```ts
 * ...
 * `@IsNotEmpty()`
 * `@IsNumber()`
 * `@Transform(({ value }) => toNumber(value))`
 * LOGGER_BUFFER: number;
 * ...
 * ```
 *
 * @param value The incoming value
 *
 * @returns The number-ed value.
 */
export function toNumber(value: unknown): number {
  const result = parseInt(value as any, 10);

  if (isNaN(result)) {
    throw new UnprocessableEntityException({
      message: 'Unable to parse value to number',
    });
  }

  return result;
}
