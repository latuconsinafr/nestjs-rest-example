import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../common/enums/error-code.enum';
import { ErrorResponse } from '../common/interfaces/http-response.interface';

/**
 * Defines the custom request timeout exception class.
 */
export class RequestTimeoutException extends HttpException {
  /**
   * The constructor.
   *
   * @param errorMessage The custom error message to throw if any
   */
  constructor(errorMessage?: ErrorResponse) {
    const message: ErrorResponse = {
      message: errorMessage?.message ?? 'Request timeout',
      error: errorMessage?.error ?? ErrorCode.ERR_REQUEST_TIMEOUT,
      help: errorMessage?.help ?? 'Help is not available',
    };

    super(
      HttpException.createBody(
        message,
        message.error,
        HttpStatus.REQUEST_TIMEOUT,
      ),
      HttpStatus.REQUEST_TIMEOUT,
    );
  }
}
