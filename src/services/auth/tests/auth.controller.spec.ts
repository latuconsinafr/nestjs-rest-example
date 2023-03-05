import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { SuccessResponse } from '../../../common/dto/responses/success-response.dto';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';
import { mockedJwtService } from '../../../common/utils/mocks/@nestjs/jwt/jwt-service.mock';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { usersData } from '../../../database/data/users.data';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../interface/auth-response.interface';
import RequestWithAuthUser from '../interface/request-with-auth-user.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as argon2 from 'argon2';

describe(AuthController.name, () => {
  let authController: AuthController;
  let authService: AuthService;
  const jwtSecret = 'secret';
  const jwtExpiresIn = '24h';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        AuthService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        UsersService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(User), useValue: mockedRepository },
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return {
                secret: jwtSecret,
                signOptions: {
                  expiresIn: jwtExpiresIn,
                },
              };
            }),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${AuthController.prototype.authenticate.name} is called`, () => {
    let request: RequestWithAuthUser;

    beforeEach(() => {
      request = { user: usersData[0] } as any;
    });

    it(`it should return a message and data contains a user`, async () => {
      expect(await authController.authenticate(request)).toStrictEqual(
        new SuccessResponse({
          message: 'User authenticated',
          data: usersData[0],
        }),
      );
    });
  });

  describe(`when ${AuthController.prototype.signIn.name} is called`, () => {
    let request: RequestWithAuthUser;
    let authServiceSignInSpy: jest.SpyInstance<
      Promise<AuthResponse>,
      [user: User]
    >;

    beforeEach(() => {
      request = { user: usersData[0] } as any;
      authServiceSignInSpy = jest.spyOn(authService, 'signIn');
      authServiceSignInSpy.mockResolvedValue({
        accessToken: jwtSecret,
        expiresIn: jwtExpiresIn,
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(authService, 'signIn').mockImplementationOnce(async () => {
          throw new Error();
        });
        await expect(authController.signIn(request)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${AuthService.name} ${AuthService.prototype.signIn.name} method`, async () => {
        await authController.signIn(request);

        expect(authServiceSignInSpy).toBeCalledTimes(1);
      });

      it('should return a message and data contains the created user', async () => {
        expect(await authController.signIn(request)).toStrictEqual(
          new SuccessResponse({
            message: 'Signed in',
            data: {
              accessToken: jwtSecret,
              expiresIn: jwtExpiresIn,
            },
          }),
        );
      });
    });
  });
});
