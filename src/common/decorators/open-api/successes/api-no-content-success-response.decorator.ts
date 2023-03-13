import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiNoContentResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_NO_CONTENT_MESSAGE } from '../../../constants';
import { NoContentSuccessResponse } from '../../../dto/responses/successes/no-content-success-response.dto';
import { ApiSuccessResponseMetadataOptions } from '../api-success-response.decorator';

/**
 * Decorators that combine {@link ApiExtraModels} and {@link ApiNoContentResponse}
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The options of no content success response
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiNoContentSuccessResponse = <TModel extends Type<any>>(
  options: ApiSuccessResponseMetadataOptions<TModel>,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { model, isArray, ...apiResponseOptions } = options;

  return applyDecorators(
    model
      ? ApiExtraModels(NoContentSuccessResponse, model)
      : ApiExtraModels(NoContentSuccessResponse),
    ApiNoContentResponse({
      description: DEFAULT_NO_CONTENT_MESSAGE,
      schema: {
        allOf: [
          { $ref: getSchemaPath(NoContentSuccessResponse) }, // * Base schema
          {
            ...(model ? { required: ['data'] } : undefined), // * Required schema conditional
            properties: {
              // * Adjusting data type of model['data']
              ...(model
                ? isArray
                  ? {
                      data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    }
                  : {
                      data: {
                        type: 'object',
                        $ref: getSchemaPath(model),
                      },
                    }
                : {
                    data: {
                      oneOf: [
                        { type: 'string', example: null },
                        { type: 'number', example: null },
                        { type: 'integer', example: null },
                        { type: 'boolean', example: null },
                      ],
                    },
                  }),
            },
          },
        ],
      },
      ...apiResponseOptions.options,
    }),
  );
};
