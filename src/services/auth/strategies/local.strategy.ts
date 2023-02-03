import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnprocessableEntityException } from '../../../common/exceptions/unprocessable-entity.exception';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

/**
 * Defines the strategy for local strategy by extending PassportStrategy with Strategy from `passport-local`.
 *
 * @usageNotes
 * This strategy being used by the guards under `AuthGuard('local')`.
 *
 * @see [Implementing Passport Strategy](https://docs.nestjs.com/security/authentication#implementing-passport-strategies)
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor.
   *
   * @param authService The auth service
   */
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * To validate the {@link LocalAuthGuard}.
   *
   * @usageNotes
   * For each strategy, Passport will call the verify function (implemented with the validate() method in nestjs/passport) using an appropriate strategy-specific set of parameters.
   *
   * @param username The username to validate
   * @param password The password to validate
   *
   * @returns The user entity.
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnprocessableEntityException({
        message: `Wrong credential provided`,
      });
    }

    return user;
  }
}
