import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { usersData } from '../../../database/data/users.data';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import * as argon2 from 'argon2';
import { mockedJwtService } from '../../../common/utils/mocks/@nestjs/jwt/jwt-service.mock';

describe(AuthService.name, () => {
  let authService: AuthService;
  let usersService: UsersService;
  let argon2Verify: jest.Mock;
  const jwtSecret = 'secret';
  const jwtExpiresIn = '24h';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
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
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${AuthService.prototype.validateUser.name} is called`, () => {
    describe('and the user is not exist', () => {
      beforeEach(() => {
        jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(
          await authService.validateUser(
            usersData[0].username,
            usersData[0].password,
          ),
        ).toBeNull();
      });
    });

    describe('and the user is exist', () => {
      beforeEach(() => {
        jest
          .spyOn(usersService, 'findByUsername')
          .mockResolvedValue(usersData[0]);
      });

      describe('and the password is verified', () => {
        beforeEach(() => {
          argon2Verify = jest.fn().mockResolvedValue(true);
          (argon2.verify as jest.Mock) = argon2Verify;
        });

        it('should return the user', async () => {
          expect(
            await authService.validateUser(
              usersData[0].username,
              usersData[0].password,
            ),
          ).toStrictEqual(usersData[0]);
        });
      });

      describe('and the password is not verified', () => {
        beforeEach(() => {
          argon2Verify = jest.fn().mockResolvedValue(false);
          (argon2.verify as jest.Mock) = argon2Verify;
        });

        it('should return null', async () => {
          expect(
            await authService.validateUser(
              usersData[0].username,
              usersData[0].password,
            ),
          ).toBeNull();
        });
      });
    });
  });

  describe(`when ${AuthService.prototype.signIn.name} is called`, () => {
    const accessToken = 'accessToken';

    beforeEach(() => {
      mockedJwtService.sign.mockReturnValue(accessToken);
    });

    it('should return the correct auth response', async () => {
      expect(await authService.signIn(usersData[0])).toStrictEqual({
        accessToken: accessToken,
        expiresIn: jwtExpiresIn,
      });
    });
  });
});
