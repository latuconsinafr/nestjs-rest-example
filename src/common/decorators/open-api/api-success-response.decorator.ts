import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponse } from '../../dto/responses/success-response.dto';

export type ApiSuccessfulResponse =
  | typeof ApiOkResponse
  | typeof ApiCreatedResponse
  | typeof ApiAcceptedResponse
  | typeof ApiNoContentResponse;

export interface ApiSuccessResponseMetadata<TModel extends Type<any>> {
  response: ApiSuccessfulResponse;
  model?: TModel;
  isArray?: boolean;
  options?: ApiResponseOptions;
}

export const ApiSuccessResponse = <TModel extends Type<any>>(
  metadata: ApiSuccessResponseMetadata<TModel>,
): MethodDecorator & ClassDecorator => {
  const { response, model, isArray, options } = metadata;

  return applyDecorators(
    model
      ? ApiExtraModels(SuccessResponse, model)
      : ApiExtraModels(SuccessResponse),
    response({
      schema: {
        title: `SuccessResponse ${model ? `of ${model.name}` : ``}`,
        allOf: [
          { $ref: getSchemaPath(SuccessResponse) },
          {
            ...(model ? { required: ['data'] } : undefined),
            properties: {
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
      description: options?.description,
    }),
  );
};
