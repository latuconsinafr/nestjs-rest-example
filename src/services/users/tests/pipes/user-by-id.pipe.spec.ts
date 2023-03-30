import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { User } from '../../entities/user.entity';
import { UserByIdPipe } from '../../pipes/user-by-id.pipe';
import { UsersService } from '../../users.service';
import { v4 as uuidv4 } from 'uuid';
import { usersData } from '../../../../database/data/users.data';

describe(UserByIdPipe.name, () => {
  let userByIdPipe: UserByIdPipe;
  let usersService: UsersService;
  let argumentMetaData: ArgumentMetadata;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserByIdPipe,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    userByIdPipe = moduleRef.get<UserByIdPipe>(UserByIdPipe);
    usersService = moduleRef.get<UsersService>(UsersService);

    argumentMetaData = {
      type: 'param',
      metatype: String,
      data: 'id',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${UserByIdPipe.prototype.transform.name} is called`, () => {
    describe('and the given value is not a valid UUID v4', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        await expect(
          userByIdPipe.transform('asdxxxasd', argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the given value a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the user is not found', () => {
        it(`should throw ${NotFoundException.name}`, async () => {
          jest.spyOn(usersService, 'findById').mockResolvedValue(null);

          await expect(
            userByIdPipe.transform(value, argumentMetaData),
          ).rejects.toThrow(NotFoundException);
        });
      });

      describe('and the user is found', () => {
        it(`should return the user`, async () => {
          jest.spyOn(usersService, 'findById').mockResolvedValue(usersData[0]);

          expect(
            await userByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(usersData[0]);
        });
      });
    });
  });
});
