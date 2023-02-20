import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../common/exceptions/unprocessable-entity.exception';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesService } from '../storages.service';

/**
 * Class defining the implementation of a pipe that parse string UUID value
 * and return the promise of local file entity of related identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to validate the string UUID value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the local file entity from the parsed string UUID local file identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class LocalFileByIdPipe
  implements PipeTransform<string, Promise<LocalFile>>
{
  constructor(private readonly storagesService: StoragesService) {}

  /**
   * {@inheritDoc PipeTransform.transform}
   */
  async transform(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ): Promise<LocalFile> {
    if (!isUUID(value, '4')) {
      throw new UnprocessableEntityException({
        message: 'The given value is not a valid UUID',
      });
    }

    const file = await this.storagesService.findLocalFileById(value);

    if (file === null) {
      throw new NotFoundException({ message: 'File not found' });
    }

    return file;
  }
}
