import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '../../../exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../exceptions/unprocessable-entity.exception';
import { User } from '../../interfaces/user.interface';
import { UserByIdPipe } from '../../pipes/user-by-id.pipe';
import { UsersService } from '../../users.service';

describe('UserByIdPipe', () => {
  let userByIdPipe: UserByIdPipe;
  let usersService: UsersService;
  let argumentMetaData: ArgumentMetadata;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserByIdPipe, UsersService],
    }).compile();

    userByIdPipe = moduleRef.get<UserByIdPipe>(UserByIdPipe);
    usersService = moduleRef.get<UsersService>(UsersService);

    argumentMetaData = {
      type: 'param',
      metatype: Number,
      data: 'id',
    };
    users = [
      {
        id: 1,
        username: 'user',
        password: 'password',
        description: 'This is user',
      },
    ];
  });

  describe('when transform is called', () => {
    describe('and the string value is unable to be parsed to int', () => {
      it(`should throw ${UnprocessableEntityException.name}`, () => {
        const value = 'asdxxasd';

        expect(() => {
          userByIdPipe.transform(value, argumentMetaData);
        }).toThrow(UnprocessableEntityException);
      });
    });

    describe('and the string value is able to be parsed to int', () => {
      let value: string;

      beforeEach(() => {
        value = '1';
      });

      describe('and the user is not found', () => {
        it(`should throw ${NotFoundException.name}`, () => {
          jest.spyOn(usersService, 'findById').mockReturnValue(undefined);

          expect(() => {
            userByIdPipe.transform(value, argumentMetaData);
          }).toThrow(NotFoundException);
        });
      });

      describe('and the user is found', () => {
        it(`should return the user`, () => {
          jest.spyOn(usersService, 'findById').mockReturnValue(users[0]);

          expect(userByIdPipe.transform(value, argumentMetaData)).toEqual(
            users[0],
          );
        });
      });
    });
  });
});
