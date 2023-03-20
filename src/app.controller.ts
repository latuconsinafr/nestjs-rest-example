import { Request } from 'express';
import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { NotToBeCached } from './common/decorators/interceptors/not-to-be-cached.decorator';
import { NotToBeTransformed } from './common/decorators/interceptors/not-to-be-transformed.decorator';
import { ApiSuccessesResponse } from './common/decorators/open-api/api-successes-response.decorator';
import { ApiOkSuccessResponse } from './common/decorators/open-api/successes/api-ok-success-response.decorator';
import { ApiErrorsResponse } from './common/decorators/open-api/api-errors-response.decorator';

/**
 * Defines the application controller.
 */
@Controller()
@ApiTags('App')
export class AppController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   */
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AppController.name);
  }

  /**
   * Index page endpoint.
   *
   * @returns
   */
  @Get()
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        options: { description: 'Success' },
      },
    },
  ])
  @ApiErrorsResponse()
  index() {
    this.logger.info(`Try to call ${AppController.prototype.index.name}`);

    return;
  }

  /**
   * Application documentation endpoint.
   *
   * @param req The incoming request
   * @param version The documentation version
   *
   * @returns The documentation link with specified version if exists, otherwise redirect to the default documentation.
   */
  @Get('docs')
  @NotToBeCached()
  @NotToBeTransformed()
  @Redirect('https://docs.nestjs.com', 302)
  @ApiExcludeEndpoint()
  getDocs(
    @Req() req: Request,
    @Query('version') version?: string,
  ): { url: string } {
    this.logger.info(`Try to call ${AppController.prototype.getDocs.name}`);

    const docsUrl = `${req.protocol}://${req.get('Host')}/docs`;

    if (!version) {
      return { url: `${docsUrl}/v1` };
    }

    return {
      url: `${docsUrl}/v${version}`,
    };
  }
}
