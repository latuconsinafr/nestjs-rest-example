import { HttpException, HttpStatus } from '@nestjs/common';
import { ERR_NOT_FOUND } from '../common/constants/error.constant';
import { ErrorMessageInterface } from '../common/interfaces/error-message.interface';

/**
 * Defines the custom not found exception class.
 */
export class NotFoundException extends HttpException {
  /**
   * The constructor.
   *
   * @param err The custom error message to throw if any
   */
  constructor(err?: ErrorMessageInterface) {
    const errorMessage: ErrorMessageInterface = {
      error: err?.error ?? ERR_NOT_FOUND,
      message: err?.message ?? 'Resource not found',
      detail:
        err?.detail ??
        'Ensure that the url and query parameter in the request are correct',
      help: err?.help ?? 'Help is not available',
    };

    super(
      HttpException.createBody(
        errorMessage,
        errorMessage.error,
        HttpStatus.NOT_FOUND,
      ),
      HttpStatus.NOT_FOUND,
    );
  }
}
