import { applyDecorators } from '@nestjs/common';
import { ApiParamOptions, ApiParam } from '@nestjs/swagger';

/**
 * Decorator that encapsulates {@link ApiParam} for param with type of Number,
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api param options
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiNumberParam = (
  options: ApiParamOptions,
): MethodDecorator & ClassDecorator & PropertyDecorator =>
  applyDecorators(
    ApiParam({
      type: Number,
      description: 'The identifier',
      example: 1,
      ...options,
    }),
  );
