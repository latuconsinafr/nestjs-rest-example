import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NOT_TO_BE_CACHED_KEY } from '../../constants';

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
 * @returns The method decorator & class decorator & property decorator
 */
export function NotToBeCached(): MethodDecorator &
  ClassDecorator &
  PropertyDecorator {
  return applyDecorators(SetMetadata(NOT_TO_BE_CACHED_KEY, true));
}
