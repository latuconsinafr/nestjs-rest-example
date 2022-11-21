import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedRepository } from '../../../../common/module-utils/utils/mocks/repository.mock';
import { usersData } from '../../../../database/data/users.data';
import { User } from '../../entities/user.entity';
import { UserByIdPipe } from '../../pipes/user-by-id.pipe';
import { UsersService } from '../../users.service';

describe('UserByIdPipe', () => {
  let userByIdPipe: UserByIdPipe;
  let usersService: UsersService;
  let argumentMetaData: ArgumentMetadata;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserByIdPipe,
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    userByIdPipe = moduleRef.get<UserByIdPipe>(UserByIdPipe);
    usersService = moduleRef.get<UsersService>(UsersService);

    argumentMetaData = {
      type: 'param',
      metatype: Number,
      data: 'id',
    };
    users = [...usersData];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when transform is called', () => {
    describe('and the string value is unable to be parsed to int', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        const value = 'asdxxasd';

        await expect(
          userByIdPipe.transform(value, argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the string value is able to be parsed to int', () => {
      let value: string;

      beforeEach(() => {
        value = '1';
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
          jest.spyOn(usersService, 'findById').mockResolvedValue(users[0]);

          expect(
            await userByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(users[0]);
        });
      });
    });
  });
});
