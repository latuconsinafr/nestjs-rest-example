import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorCode, ErrorMessage } from '../common/enums/error.enum';
import { ErrorResponse } from '../common/interfaces/http-response.interface';

/**
 * Default help message.
 */
const defaultHelpMessage = 'Help is not available';

/**
 * Defines an HTTP exception for *Not Found* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class NotFoundException extends HttpException {
  /**
   * Instantiate an `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * @usageNotes
   * The HTTP response status code will be 404.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link ErrorMessage.ErrorNotFoundMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorNotFound} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link defaultHelpMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: ErrorResponse) {
    const httpStatus = HttpStatus.NOT_FOUND;
    const response: ErrorResponse = {
      message: errorResponse?.message ?? ErrorMessage.ErrorNotFoundMessage,
      error: errorResponse?.error ?? ErrorCode.ErrorNotFound,
      help: errorResponse?.help ?? defaultHelpMessage,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}

/**
 * Defines an HTTP exception for *Request Timeout* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class RequestTimeoutException extends HttpException {
  /**
   * Instantiate an `RequestTimeoutException` Exception.
   *
   * @example
   * `throw new RequestTimeoutException()`
   *
   * @usageNotes
   * The HTTP response status code will be 408.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link ErrorMessage.ErrorRequestTimeoutMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorRequestTimeout} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link defaultHelpMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: ErrorResponse) {
    const httpStatus = HttpStatus.REQUEST_TIMEOUT;
    const response: ErrorResponse = {
      message:
        errorResponse?.message ?? ErrorMessage.ErrorRequestTimeoutMessage,
      error: errorResponse?.error ?? ErrorCode.ErrorRequestTimeout,
      help: errorResponse?.help ?? defaultHelpMessage,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}

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
   * - `message`: the string {@link ErrorMessage.ErrorUnprocessableEntityMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorUnprocessableEntity} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link defaultHelpMessage} by default;
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
          ? errors.map((error) => ({
              property: error.property,
              constraints: error.constraints
                ? Object.values(error.constraints)
                : [],
            }))
          : ErrorMessage.ErrorUnprocessableEntityMessage),
      error: errorResponse?.error ?? ErrorCode.ErrorUnprocessableEntity,
      help: errorResponse?.help ?? defaultHelpMessage,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class InternalServerErrorException extends HttpException {
  /**
   * Instantiate an `InternalServerErrorException` Exception.
   *
   * @example
   * `throw new InternalServerErrorException()`
   *
   * @usageNotes
   * The HTTP response status code will be 500.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link ErrorMessage.ErrorInternalServerErrorMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorInternalServerError} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link defaultHelpMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: ErrorResponse) {
    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const response: ErrorResponse = {
      message:
        errorResponse?.message ?? ErrorMessage.ErrorInternalServerErrorMessage,
      error: errorResponse?.error ?? ErrorCode.ErrorInternalServerError,
      help: errorResponse?.help ?? defaultHelpMessage,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
