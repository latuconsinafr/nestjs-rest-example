import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception';

/**
 * Defines the parse int from string value pipe.
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new UnprocessableEntityException({
        message: 'Unable to parse value to int',
      });
    }

    return val;
  }
}
