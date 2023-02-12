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
import { ApiTags } from '@nestjs/swagger';
import { ApiErrorsResponse } from '../../common/decorators/open-api/api-errors-response.decorator';
import { ApiOkSuccessResponse } from '../../common/decorators/open-api/successes/api-ok-success-response.decorator';
import { ApiNotFoundErrorResponse } from '../../common/decorators/open-api/errors/api-not-found-error-response.decorator';
import { ApiNumberParam } from '../../common/decorators/open-api/params/api-number-param.decorator';

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
  @ApiNumberParam({ name: 'id', description: 'The id of local file' })
  @ApiOkSuccessResponse({ description: 'File loaded' })
  @ApiErrorsResponse([
    {
      response: ApiNotFoundErrorResponse,
      options: { description: 'File not found' },
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
