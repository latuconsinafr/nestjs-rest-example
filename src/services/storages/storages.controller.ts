import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { LocalFile } from './entities/local-file.entity';
import { Response } from 'express';
import { LocalFileByIdPipe } from './pipes/local-file-by-id.pipe';
import { NotToBeCached } from '../../common/decorators/not-to-be-cached.decorator';
import { NotToBeTransformed } from '../../common/decorators/not-to-be-transformed.decorator';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';

/**
 * Defines the storages controller.
 */
@Controller({
  version: '1',
  path: 'storages',
})
export class StoragesController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   */
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(StoragesController.name);
  }

  /**
   * Gets a local file by a given id endpoint.
   *
   * @param id The id to find
   * @param response The response type and options
   *
   * @returns The Streamable of LocalFile
   */
  @Get(':id')
  @NotToBeCached()
  @NotToBeTransformed()
  async findLocalFileById(
    @Param('id', LocalFileByIdPipe) file: LocalFile,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    this.logger.info(
      `Try to call ${StoragesController.prototype.findLocalFileById.name}`,
    );

    const path = join(process.cwd(), file.path);

    if (!fs.existsSync(path)) {
      throw new NotFoundException({ message: 'File not found' });
    }

    try {
      const stream = fs.createReadStream(path);

      response.set({
        'Content-Disposition': `inline; filename="${file.fileName}"`,
        'Content-Type': file.mimeType,
      });

      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
