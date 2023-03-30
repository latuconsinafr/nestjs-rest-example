/* istanbul ignore file */
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DEFAULT_CONTENT_TOO_LARGE_MESSAGE,
  DEFAULT_HELP_MESSAGE,
} from '../constants';
import { ErrorResponse } from '../dto/responses/error-response.dto';
import { ErrorCode } from '../enums/http/error-code.enum';

/**
 * Defines an HTTP exception for *ContentTooLarge* type errors.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 */
export class ContentTooLargeException extends HttpException {
  /**
   * Instantiate an `ContentTooLargeException` Exception.
   *
   * @example
   * `throw new ContentTooLargeException()`
   *
   * @usageNotes
   * The HTTP response status code will be 413.
   * - The `errorResponse` argument defines the JSON response body.
   *
   * By default, the JSON response body contains three properties:
   * - `message`: the string {@link DEFAULT_CONTENT_TOO_LARGE_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   * - `error`: the enum {@link ErrorCode.ErrorContentTooLarge} by default;
   * override this by supplying any value of `ErrorCode` in the errorResponse parameter.
   * - `help`: the string {@link DEFAULT_HELP_MESSAGE} by default;
   * override this by supplying a string in the errorResponse parameter.
   *
   * @param errorResponse Object describing the error condition, if any
   */
  constructor(errorResponse?: Partial<ErrorResponse>) {
    const httpStatus = HttpStatus.PAYLOAD_TOO_LARGE;
    const response: ErrorResponse = new ErrorResponse({
      message: errorResponse?.message ?? DEFAULT_CONTENT_TOO_LARGE_MESSAGE,
      error: errorResponse?.error ?? ErrorCode.ErrorContentTooLarge,
      help: errorResponse?.help ?? DEFAULT_HELP_MESSAGE,
    });

    super(
      HttpException.createBody(response, response.error, httpStatus),
      httpStatus,
    );
  }
}
