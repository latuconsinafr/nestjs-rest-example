import { applyDecorators, SetMetadata } from '@nestjs/common';
import { NOT_TO_BE_TRANSFORMED_METADATA } from '../constants';

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
 * @param roles An array of user roles to bind
 */
export function NotToBeTransformed() {
  return applyDecorators(SetMetadata(NOT_TO_BE_TRANSFORMED_METADATA, true));
}
