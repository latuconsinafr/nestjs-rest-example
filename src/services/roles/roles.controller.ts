import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { APP_VERSION } from '../../common/constants';
import { ApiErrorsResponse } from '../../common/decorators/open-api/api-errors-response.decorator';
import { ApiSuccessesResponse } from '../../common/decorators/open-api/api-successes-response.decorator';
import { ApiForbiddenErrorResponse } from '../../common/decorators/open-api/errors/api-forbidden-error-response.decorator';
import { ApiUnauthorizedErrorResponse } from '../../common/decorators/open-api/errors/api-unauthorized-error-response.decorator';
import { ApiOkSuccessResponse } from '../../common/decorators/open-api/successes/api-ok-success-response.decorator';
import { SuccessResponse } from '../../common/dto/responses/success-response.dto';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { RoleResponse } from './dto/responses/role-response.dto';
import { RolesService } from './roles.service';

@Controller({
  path: 'roles',
  version: APP_VERSION,
})
@ApiTags('Roles')
export class RolesController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param postsService The posts service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly rolesService: RolesService,
  ) {
    this.logger.setContext(RolesController.name);
  }

  /**
   * Get all roles endpoint.
   *
   * @returns The success response with `'Roles retrieved'` message and `roles` data.
   */
  @Get()
  @ApiBearerAuth()
  @ApiSuccessesResponse([
    {
      response: ApiOkSuccessResponse,
      options: {
        model: RoleResponse,
        isArray: true,
        options: { description: 'Roles retrieved' },
      },
    },
  ])
  @ApiErrorsResponse([
    { response: ApiUnauthorizedErrorResponse },
    { response: ApiForbiddenErrorResponse },
  ])
  async findAllRoles(): Promise<SuccessResponse<RoleResponse[]>> {
    this.logger.info(
      `Try to call ${RolesController.prototype.findAllRoles.name}`,
    );

    try {
      return new SuccessResponse({
        message: 'Roles retrieved',
        data: await this.rolesService.findAll(),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
