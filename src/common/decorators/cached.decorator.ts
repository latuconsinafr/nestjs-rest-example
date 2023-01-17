import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NOT_TO_BE_CACHED_METADATA } from '../constants';

/**
 * Decorator that combine multiple decorators to apply cache implementation,
 * to the scope of controller or method, depending on its context.
 *
 * **The cached itself is enabled in global-scoped by default.**
 *
 * @example
 * `NotToBeCached()`
 *
 * @usageNotes
 * This decorator applies:
 * - `@SetMetadata` decorator
 *
 * @param roles An array of user roles to bind
 */
export function NotToBeCached() {
  return applyDecorators(SetMetadata(NOT_TO_BE_CACHED_METADATA, true));
}
