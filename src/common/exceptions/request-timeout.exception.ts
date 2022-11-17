import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DEFAULT_HELP_MESSAGE,
  DEFAULT_REQUEST_TIMEOUT_MESSAGE,
} from '../constants';
import { ErrorCode } from '../enums/error-code.enum';
import { ErrorResponse } from '../interfaces/http/error-response.interface';

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
   * - `message`: the string {@link DEFAULT_REQUEST_TIMEOUT_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorRequestTimeout} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link DEFAULT_HELP_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: ErrorResponse) {
    const httpStatus = HttpStatus.REQUEST_TIMEOUT;
    const response: ErrorResponse = {
      message: errorResponse?.message ?? DEFAULT_REQUEST_TIMEOUT_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ErrorRequestTimeout,
      help: errorResponse?.help ?? DEFAULT_HELP_MESSAGE,
    };

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
