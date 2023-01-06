import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { LocalFile } from './entities/local-file.entity';
import { Response } from 'express';
import { LocalFileByIdPipe } from './pipes/local-file-by-id.pipe';

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
  async findLocalFileById(
    @Param('id', LocalFileByIdPipe) file: LocalFile,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    this.logger.info(
      `Try to call ${StoragesController.prototype.findLocalFileById.name}`,
    );

    try {
      const stream = createReadStream(join(process.cwd(), file.path));

      response.set({
        'Content-Disposition': `inline; filename="${file.fileName}"`,
        'Content-Type': file.mimeType,
      });

      // TODO: Has to be excluded from transform interceptor
      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
