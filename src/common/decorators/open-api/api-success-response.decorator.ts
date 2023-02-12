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
import { ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SuccessResponse } from '../../dto/responses/success-response.dto';
import { CreatedSuccessResponse } from '../../dto/responses/successes/created-success-response.dto';
import { NoContentSuccessResponse } from '../../dto/responses/successes/no-content-success-response.dto';
import { OkSuccessResponse } from '../../dto/responses/successes/ok-success-response.dto';
import { ApiCreatedSuccessResponse } from './successes/api-created-success-response.decorator';
import { ApiNoContentSuccessResponse } from './successes/api-no-content-success-response.decorator';
import { ApiOkSuccessResponse } from './successes/api-ok-success-response.decorator';

/**
 * Defines the type of api successful response.
 */
export type ApiSuccessfulResponse =
  | typeof ApiOkResponse
  | typeof ApiCreatedResponse
  | typeof ApiAcceptedResponse
  | typeof ApiNoContentResponse;

/**
 * Defines the type of api custom successful response.
 */
export type ApiCustomSuccessfulResponse =
  | typeof ApiOkSuccessResponse
  | typeof ApiCreatedSuccessResponse
  | typeof ApiNoContentSuccessResponse;

/**
 * Defines the api success response meta data.
 */
export interface ApiSuccessResponseMetadata<TModel extends Type<any>> {
  response: ApiSuccessfulResponse | ApiCustomSuccessfulResponse;
  model?: TModel;
  isArray?: boolean;
  options?: ApiResponseOptions;
}

/**
 * Decorator that encapsulates any success response of type of {@link ApiSuccessfulResponse} and {@link ApiCustomSuccessfulResponse},
 * combines {@link ApiExtraModels} and the supplied response decorator
 * to the scope controller or method or route handler, depending on its context.
 *
 * @param options The api success response meta data
 *
 * @returns The method decorator & class decorator & property decorator.
 */
export const ApiSuccessResponse = <TModel extends Type<any>>(
  metadata: ApiSuccessResponseMetadata<TModel>,
): MethodDecorator & ClassDecorator & PropertyDecorator => {
  const { response, model, isArray, options } = metadata;

  let ref: ReferenceObject = { $ref: getSchemaPath(SuccessResponse) };

  // TODO: This schema path should be dynamically assigned to api response
  if (response === ApiOkSuccessResponse) {
    ref = { $ref: getSchemaPath(OkSuccessResponse) };
  } else if (response === ApiCreatedSuccessResponse) {
    ref = { $ref: getSchemaPath(CreatedSuccessResponse) };
  } else if (response === ApiNoContentSuccessResponse) {
    ref = { $ref: getSchemaPath(NoContentSuccessResponse) };
  }

  return applyDecorators(
    model
      ? ApiExtraModels(SuccessResponse, model)
      : ApiExtraModels(SuccessResponse),
    response({
      schema: {
        title: `SuccessResponse ${model ? `of ${model.name}` : ``}`,
        allOf: [
          ref,
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
      ...options,
    }),
  );
};
