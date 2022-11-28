import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  DEFAULT_HELP_MESSAGE,
  DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE,
} from '../constants';
import { ErrorCode } from '../enums/error-code.enum';
import { ValidationErrorResponse } from '../interfaces/http/base-response.interface';
import { ErrorResponse } from '../interfaces/http/error-response.interface';

/**
 * Maps an array of validation error to array of validation error response.
 * This function maps the nested `children` `constraints` value.
 *
 * @param errors The validation error to map
 *
 * @returns The array of validation error response.
 */
const mapChildrenToValidationErrorResponses = (
  errors: ValidationError[],
): ValidationErrorResponse[] => {
  return errors.map((error) => ({
    property: error.property,
    constraints:
      Array.isArray(error.children) && error.children.length > 0
        ? mapChildrenToValidationErrorResponses(error.children)
        : Object.values(error.constraints ?? []),
  }));
};

/**
 * Defines an HTTP exception for *Unprocessable Entity* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class UnprocessableEntityException extends HttpException {
  /**
   * Instantiate an `UnprocessableEntityException` Exception.
   *
   * @example
   * `throw new UnprocessableEntityException()`
   *
   * @usageNotes
   * The HTTP response status code will be 422.
   * - The `errorResponse` argument defines the JSON response body.
   * - The `errors` argument defines validation error.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorUnprocessableEntity} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link DEFAULT_HELP_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   * @param errors Object describing error validation, if any
   */
  constructor(errorResponse?: ErrorResponse, errors?: ValidationError[]) {
    const httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;

    const response: ErrorResponse = {
      message:
        errorResponse?.message ??
        (errors
          ? mapChildrenToValidationErrorResponses(errors)
          : DEFAULT_UNPROCESSABLE_ENTITY_MESSAGE),
      error: errorResponse?.error ?? ErrorCode.ErrorUnprocessableEntity,
      help: errorResponse?.help ?? DEFAULT_HELP_MESSAGE,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
