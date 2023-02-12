import { Controller, Req, Post, HttpCode, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';
import { NotToBeCached } from '../../common/decorators/interceptors/not-to-be-cached.decorator';
import { ApiErrorResponses } from '../../common/decorators/open-api/api-error-responses.decorator';
import { ApiSuccessResponse } from '../../common/decorators/open-api/api-success-response.decorator';
import { SuccessResponse } from '../../common/dto/responses/success-response.dto';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import UserResponse from '../users/dto/responses/users/user-response.dto';
import { AuthService } from './auth.service';
import { UseJwtAuth } from './decorators/use-jwt-auth.decorator';
import { UseLocalAuth } from './decorators/use-local-auth.decorator';
import SignInRequest from './dto/requests/sign-in-request.dto';
import SignInResponse from './dto/responses/sign-in-response.dto';
import RequestWithAuthUser from './interface/request-with-auth-user.interface';

/**
 * Defines the auth controller.
 */
@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags('Auth')
export class AuthController {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param authService The auth service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly authService: AuthService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  /**
   * Gets an authenticated user with a given token payload endpoint.
   *
   * @param user The authenticated user
   *
   * @returns The success response with `'User authenticated'` message and a `user` data.
   */
  @Get()
  @NotToBeCached()
  @UseJwtAuth()
  @ApiBearerAuth()
  @ApiSuccessResponse({
    response: ApiOkResponse,
    model: UserResponse,
    options: { description: 'User authenticated' },
  })
  @ApiErrorResponses([
    {
      response: ApiUnauthorizedResponse,
      options: { description: 'Unauthorized' },
    },
    {
      response: ApiInternalServerErrorResponse,
      options: { description: 'Something went wrong' },
    },
  ])
  async authenticate(
    @Req() { user }: RequestWithAuthUser,
  ): Promise<SuccessResponse<UserResponse>> {
    this.logger.info(
      `Try to call ${AuthController.prototype.authenticate.name}`,
    );

    return new SuccessResponse({
      message: 'User authenticated',
      data: user,
    });
  }

  /**
   * Signs in a user with a given username and password endpoint.
   *
   * @param user The authenticated user
   *
   * @returns The success response with `'Signed in'` message and an `AuthResponse` data.
   */
  @Post('sign-in')
  @UseLocalAuth()
  @HttpCode(200)
  @ApiBody({ type: SignInRequest })
  @ApiSuccessResponse({
    response: ApiOkResponse,
    model: SignInResponse,
    options: { description: 'Signed in' },
  })
  @ApiErrorResponses([
    {
      response: ApiUnprocessableEntityResponse,
      options: { description: 'Wrong credential provided' },
    },
    {
      response: ApiInternalServerErrorResponse,
      options: { description: 'Something went wrong' },
    },
  ])
  async signIn(
    @Req() { user }: RequestWithAuthUser,
  ): Promise<SuccessResponse<SignInResponse>> {
    this.logger.info(`Try to call ${AuthController.prototype.signIn.name}`);

    try {
      return new SuccessResponse({
        message: 'Signed in',
        data: await this.authService.signIn(user),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
