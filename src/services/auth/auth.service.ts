import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './interface/auth-response.interface';

/**
 * Defines the auth service that responsible for application authentication.
 */
@Injectable()
export class AuthService {
  /**
   * Defines the jwt module options for authentication processes.
   */
  private readonly jwtModuleOptions: JwtModuleOptions;

  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param usersService The users service
   * @param jwtService The JWT service
   * @param configService The config service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(AuthService.name);
    this.jwtModuleOptions = {
      ...this.configService.get<JwtModuleOptions>('jwt'),
    };
  }

  /**
   * Verify the user's authorization with the given username and password.
   *
   * @param username The username to verify
   * @param password The password to verify
   *
   * @returns The user entity with `password` attribute being omitted if it exists, otherwise null.
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  /**
   * Signs in the requested user and generates auth response.
   *
   * @param user The requested user to be signed
   *
   * @returns The {@link AuthResponse}.
   */
  async signIn(user: User): Promise<AuthResponse> {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.jwtModuleOptions.secret,
        expiresIn: this.jwtModuleOptions.signOptions?.expiresIn,
      }),
      expiresIn: this.jwtModuleOptions.signOptions?.expiresIn,
    };
  }
}
