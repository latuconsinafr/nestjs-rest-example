import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../../common/utils/mocks/typeorm/repository.mock';
import { usersData } from '../../../../../database/data/users.data';
import { User } from '../../../entities/user.entity';
import { UserByIdHook } from '../../../permissions/hooks/users/user-by-id.hook';
import { UsersService } from '../../../users.service';

describe(UserByIdHook.name, () => {
  let userByIdHook: UserByIdHook;
  let usersService: UsersService;
  let request: Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserByIdHook,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    userByIdHook = moduleRef.get<UserByIdHook>(UserByIdHook);
    usersService = moduleRef.get<UsersService>(UsersService);

    request = {
      casl: {} as any,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${UserByIdHook.prototype.run.name} is called`, () => {
    describe('and the user is not found', () => {
      it(`should return undefined`, async () => {
        jest.spyOn(usersService, 'findById').mockResolvedValue(null);

        expect(
          await userByIdHook.run({ ...request, params: usersData[0].id }),
        ).toBeUndefined();
      });
    });

    describe('and the user is found', () => {
      it(`should return the user`, async () => {
        jest.spyOn(usersService, 'findById').mockResolvedValue(usersData[0]);

        expect(
          await userByIdHook.run({ ...request, params: usersData[0].id }),
        ).toStrictEqual(usersData[0]);
      });
    });
  });
});
