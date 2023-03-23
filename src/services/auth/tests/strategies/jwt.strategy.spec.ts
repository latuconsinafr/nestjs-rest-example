import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { UnauthorizedErrorResponse } from '../../../../common/dto/responses/errors/unauthorized-error-response.dto';
import { UnauthorizedException } from '../../../../common/exceptions/unauthorized.exception';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { usersData } from '../../../../database/data/users.data';
import { User } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/users.service';
import { TokenPayload } from '../../interface/token-payload.interface';
import { JwtStrategy } from '../../strategies/jwt.strategy';

describe(JwtStrategy.name, () => {
  let jwtStrategy: JwtStrategy;
  let usersService: UsersService;
  const jwtSecret = 'secret';
  const jwtExpiresIn = '24h';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
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
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${JwtStrategy.prototype.validate.name} is called`, () => {
    let payload: TokenPayload;

    beforeEach(() => {
      payload = {
        sub: usersData[0].id,
        username: usersData[0].username,
      };
    });

    describe('and the user is not found', () => {
      it(`should throw ${UnauthorizedErrorResponse.name} exception`, async () => {
        jest.spyOn(usersService, 'findById').mockResolvedValue(null);

        await expect(jwtStrategy.validate(payload)).rejects.toThrow(
          UnauthorizedException,
        );
      });
    });

    describe('and the user is found', () => {
      it('should return the authenticated user', async () => {
        jest.spyOn(usersService, 'findById').mockResolvedValue(usersData[0]);

        expect(await jwtStrategy.validate(payload)).toStrictEqual(usersData[0]);
      });
    });
  });
});
