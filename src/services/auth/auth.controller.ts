import { Controller, Req, Post, HttpCode, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { NotToBeCached } from '../../common/decorators/not-to-be-cached.decorator';
import { SuccessResponseDto } from '../../common/dto/responses/success-response.dto';
import { InternalServerErrorException } from '../../common/exceptions/internal-server-error.exception';
import { SuccessResponse } from '../../common/interfaces/http/success-response.interface';
import { AuthService } from './auth.service';
import { UseJwtAuth } from './decorators/use-jwt-auth.decorator';
import { UseLocalAuth } from './decorators/use-local-auth.decorator';
import RequestWithAuthUser from './interface/request-with-auth-user.interface';

/**
 * Defines the auth controller.
 */
@Controller({
  version: '1',
  path: 'auth',
})
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
  async authenticate(
    @Req() { user }: RequestWithAuthUser,
  ): Promise<SuccessResponse> {
    this.logger.info(
      `Try to call ${AuthController.prototype.authenticate.name}`,
    );

    return new SuccessResponseDto({
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
  async signIn(@Req() { user }: RequestWithAuthUser): Promise<SuccessResponse> {
    this.logger.info(`Try to call ${AuthController.prototype.signIn.name}`);

    try {
      return new SuccessResponseDto({
        message: 'Signed in',
        data: await this.authService.signIn(user),
      });
    } catch (error) {
      this.logger.error(`Error occurred: ${error}`);

      throw new InternalServerErrorException();
    }
  }
}
