import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { DEFAULT_CREATED_MESSAGE } from '../../../constants';
import { CreatedSuccessResponse } from '../../../dto/responses/successes/created-success-response.dto';
import { ApiSuccessResponseMetadataOptions } from '../api-success-response.decorator';

/**
 * Decorators that combine {@link ApiExtraModels} and {@link ApiCreatedResponse}
 * to the scope of controller or method or route handler, depending on its context.
 *
 * @param options The options of created success response
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiCreatedSuccessResponse = <TModel extends Type<any>>(
  options: ApiSuccessResponseMetadataOptions<TModel>,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { model, isArray, ...apiResponseOptions } = options;

  return applyDecorators(
    model
      ? ApiExtraModels(CreatedSuccessResponse, model)
      : ApiExtraModels(CreatedSuccessResponse),
    ApiCreatedResponse({
      description: DEFAULT_CREATED_MESSAGE,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CreatedSuccessResponse) }, // * Base schema
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
                : undefined),
            },
          },
        ],
      },
      ...apiResponseOptions.options,
    }),
  );
};
