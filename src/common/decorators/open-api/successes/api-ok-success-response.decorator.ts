import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DEFAULT_OK_MESSAGE } from '../../../constants';
import { OkSuccessResponse } from '../../../dto/responses/successes/ok-success-response.dto';
import { ApiSuccessResponseMetadataOptions } from '../api-success-response.decorator';

/**
 * Decorators that combine {@link ApiExtraModels} and {@link ApiOkResponse}
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The options of ok success response
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiOkSuccessResponse = <TModel extends Type<any>>(
  options: ApiSuccessResponseMetadataOptions<TModel>,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { model, isArray, ...apiResponseOptions } = options;

  return applyDecorators(
    model
      ? ApiExtraModels(OkSuccessResponse, model)
      : ApiExtraModels(OkSuccessResponse),
    ApiOkResponse({
      description: DEFAULT_OK_MESSAGE,
      schema: {
        allOf: [
          { $ref: getSchemaPath(OkSuccessResponse) }, // * Base schema
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
