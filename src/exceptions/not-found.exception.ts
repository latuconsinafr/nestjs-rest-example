import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../common/enums/error-code.enum';
import { ErrorResponse } from '../common/interfaces/http-response.interface';

/**
 * Defines the custom not found exception class.
 */
export class NotFoundException extends HttpException {
  /**
   * The constructor.
   *
   * @param errorMessage The custom error message to throw if any
   */
  constructor(errorMessage?: ErrorResponse) {
    const message: ErrorResponse = {
      message: errorMessage?.message ?? 'Resource not found',
      error: errorMessage?.error ?? ErrorCode.ERR_NOT_FOUND,
      help: errorMessage?.help ?? 'Help is not available',
    };

    super(
      HttpException.createBody(message, message.error, HttpStatus.NOT_FOUND),
      HttpStatus.NOT_FOUND,
    );
  }
}
