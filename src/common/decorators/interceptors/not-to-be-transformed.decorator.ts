import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NOT_TO_BE_TRANSFORMED_KEY } from '../../constants';

/**
 * Decorator that combine multiple decorators to apply transform implementation,
 * to the scope of controller or method, depending on its context.
 *
 * **The transformed itself is enabled in global-scoped by default.**
 *
 * @example
 * `NotToBeTransformed()`
 *
 * @usageNotes
 * This decorator applies:
 * - `@SetMetadata` decorator
 *
 * @returns The method decorator & class decorator & property decorator
 */
export function NotToBeTransformed(): MethodDecorator &
  ClassDecorator &
  PropertyDecorator {
  return applyDecorators(SetMetadata(NOT_TO_BE_TRANSFORMED_KEY, true));
}
