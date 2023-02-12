import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { LocalFile } from './entities/local-file.entity';
import { Response } from 'express';
import { LocalFileByIdPipe } from './pipes/local-file-by-id.pipe';
import { NotToBeCached } from '../../common/decorators/interceptors/not-to-be-cached.decorator';
import { NotToBeTransformed } from '../../common/decorators/interceptors/not-to-be-transformed.decorator';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorResponses } from '../../common/decorators/open-api/api-error-responses.decorator';
import { localFilesData } from '../../database/data/local-files.data';

/**
 * Defines the storages controller.
 */
@Controller({
  version: '1',
  path: 'storages',
})
@ApiTags('Storages')
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
  @Get('local/:id')
  @NotToBeCached()
  @NotToBeTransformed()
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'The id of local file',
    example: localFilesData[0].id,
  })
  @ApiOkResponse({ description: 'File loaded' })
  @ApiErrorResponses([
    {
      response: ApiNotFoundResponse,
      options: { description: 'File not found' },
    },
    {
      response: ApiInternalServerErrorResponse,
      options: { description: 'Something went wrong' },
    },
  ])
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
