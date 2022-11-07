import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { ErrorCode } from '../common/enums/error-code.enum';
import { ErrorResponse } from '../common/interfaces/http-response.interface';

/**
 * Defines the unprocessable entity exception class.
 */
export class UnprocessableEntityException extends HttpException {
  /**
   * The constructor.
   *
   * @param errors The validation error if any
   * @param errorMessage The custom error message to throw if any
   */
  constructor(errorMessage?: ErrorResponse, errors?: ValidationError[]) {
    const message: ErrorResponse = {
      message:
        errorMessage?.message ??
        (errors
          ? errors.map((error) => ({
              property: error.property,
              constraints: error.constraints
                ? Object.values(error.constraints)
                : [],
            }))
          : 'Unprocessable entity'),
      error: errorMessage?.error ?? ErrorCode.ERR_UNPROCESSABLE_ENTITY,
      help: errorMessage?.help ?? 'Help is not available',
    };

    super(
      HttpException.createBody(
        message,
        message.error,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
