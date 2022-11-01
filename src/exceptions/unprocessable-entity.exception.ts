import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { ERR_UNPROCESSABLE_ENTITY } from '../common/constants/error.constant';
import { ErrorMessageInterface } from '../common/interfaces/error-message.interface';

export class UnprocessableEntityException extends HttpException {
  constructor(err?: ErrorMessageInterface, errors?: ValidationError[]) {
    const errorMessage: ErrorMessageInterface = {
      error: err?.error ?? ERR_UNPROCESSABLE_ENTITY,
      message:
        err?.message ??
        (errors
          ? errors.map((error) => ({
              property: error.property,
              constraints: error.constraints
                ? Object.values(error.constraints)
                : [],
            }))
          : 'Unprocessable entity'),
      detail:
        err?.detail ??
        'Ensure that the value in the request body fields are valid',
      help: err?.help ?? 'Help is not available',
    };

    super(
      HttpException.createBody(
        errorMessage,
        errorMessage.error,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
