import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../common/exceptions/unprocessable-entity.exception';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesService } from '../storages.service';

/**
 * Class defining the implementation of a pipe that parse int from any string value {@link ParseIntPipe},
 * also parse the local file entity from the parsed int local file identifier value.
 *
 * @usageNotes
 * The transform method will throw {@link UnprocessableEntityException}, if fail to parse the string value.
 *
 * Also the transform method will throw {@link NotFoundException}, if fail to parse the local file entity from the parsed int local file identifier value.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
@Injectable()
export class LocalFileByIdPipe implements PipeTransform<string> {
  constructor(private readonly storagesService: StoragesService) {}

  /**
   * {@inheritDoc PipeTransform.transform}
   */
  async transform(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ): Promise<LocalFile> {
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      throw new UnprocessableEntityException({
        message: 'Unable to parse the value to int',
      });
    }

    const file = await this.storagesService.findLocalFileById(val);

    if (file === null) {
      throw new NotFoundException({
        message: 'File not found',
      });
    }

    return file;
  }
}
