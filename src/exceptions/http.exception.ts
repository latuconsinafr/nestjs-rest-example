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
   * - `message`: the string {@link ErrorMessage.ERR_NOT_FOUND_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ERR_NOT_FOUND} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link defaultHelpMessage} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: ErrorResponse) {
    const httpStatus = HttpStatus.NOT_FOUND;
    const response: ErrorResponse = {
      message: errorResponse?.message ?? ErrorMessage.ERR_NOT_FOUND_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ERR_NOT_FOUND,
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
   * - `message`: the string {@link ErrorMessage.ERR_REQUEST_TIMEOUT_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ERR_REQUEST_TIMEOUT} by default;
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
        errorResponse?.message ?? ErrorMessage.ERR_REQUEST_TIMEOUT_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ERR_REQUEST_TIMEOUT,
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
   * - `message`: the string {@link ErrorMessage.ERR_UNPROCESSABLE_ENTITY_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ERR_UNPROCESSABLE_ENTITY} by default;
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
          : ErrorMessage.ERR_UNPROCESSABLE_ENTITY_MESSAGE),
      error: errorResponse?.error ?? ErrorCode.ERR_UNPROCESSABLE_ENTITY,
      help: errorResponse?.help ?? defaultHelpMessage,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
