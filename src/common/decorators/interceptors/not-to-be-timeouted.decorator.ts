import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NOT_TO_BE_TIMEOUTED_KEY } from '../../constants';

/**
 * Decorator that combine multiple decorators to apply timeout implementation,
 * to the scope of controller or method, depending on its context.
 *
 * **The timeout itself is enabled in global-scoped by default.**
 *
 * @example
 * `NotToBeTimeouted()`
 *
 * @usageNotes
 * This decorator applies:
 * - `@SetMetadata` decorator
 *
 * @returns The method decorator & class decorator & property decorator
 */
export function NotToBeTimeouted(): MethodDecorator &
  ClassDecorator &
  PropertyDecorator {
  return applyDecorators(SetMetadata(NOT_TO_BE_TIMEOUTED_KEY, true));
}
