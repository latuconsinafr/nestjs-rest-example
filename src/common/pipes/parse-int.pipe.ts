import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { UnprocessableEntityException } from '../exceptions/unprocessable-entity.exception';

/**
 * Class defining the implementation of a pipe that parse int from any string value.
 *
 * @usageNotes
 * The transform method will throw `UnprocessableEntityException`,
 * if fail to parse the string value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  /**
   * {@inheritDoc ExceptionFilter.catch}
   */
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
