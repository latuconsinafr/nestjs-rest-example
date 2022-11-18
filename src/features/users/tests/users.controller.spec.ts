import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuccessResponseDto } from '../../../common/dto/responses/success-response.dto';
import { ConflictException } from '../../../common/exceptions/conflict.exception';
import { mockedRepository } from '../../../common/module-utils/utils/mocks/repository.mock';
import { usersData } from '../../../database/data/users.data';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockedRepository },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);

    users = [...usersData];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when createUser is called', () => {
    let usersServiceCreateSpy: jest.SpyInstance<Promise<User>, [user: User]>;
    let userToCreate: CreateUserRequest;

    beforeEach(() => {
      usersServiceCreateSpy = jest.spyOn(usersService, 'create');
      usersServiceCreateSpy.mockResolvedValue(users[0]);
      userToCreate = {
        username: users[0].username,
        password: users[0].password,
        roles: users[0].roles,
      };
    });

    it(`should call ${UsersService.name} create method`, async () => {
      await usersController.createUser(userToCreate);

      expect(usersServiceCreateSpy).toBeCalledTimes(1);
    });

    it('should return the created user', async () => {
      expect(await usersController.createUser(userToCreate)).toStrictEqual(
        new SuccessResponseDto({
          message: 'User created',
          data: users[0],
        }),
      );
    });
  });

  describe('when findAllUsers is called', () => {
    let usersServiceFindAllSpy: jest.SpyInstance<Promise<User[]>, []>;

    beforeEach(() => {
      usersServiceFindAllSpy = jest.spyOn(usersService, 'findAll');
      usersServiceFindAllSpy.mockResolvedValue(users);
    });

    it(`should call ${UsersService.name} findAll method`, async () => {
      await usersController.findAllUsers();

      expect(usersServiceFindAllSpy).toBeCalledTimes(1);
    });

    it(`should return a ${SuccessResponseDto.name} with message and data contains array of users`, async () => {
      expect(await usersController.findAllUsers()).toStrictEqual(
        new SuccessResponseDto({
          message: 'Users retrieved',
          data: users,
        }),
      );
    });
  });

  describe('when findUserById is called', () => {
    it(`should return a ${SuccessResponseDto.name} with message and data contains user`, async () => {
      expect(await usersController.findUserById(users[0])).toStrictEqual(
        new SuccessResponseDto({
          message: 'User retrieved',
          data: users[0],
        }),
      );
    });
  });

  describe('when updateUser is called', () => {
    let usersServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: number, user: User]
    >;
    let userToUpdate: UpdateUserRequest;

    beforeEach(() => {
      usersServiceUpdateSpy = jest.spyOn(usersService, 'update');
      usersServiceUpdateSpy.mockResolvedValue(true);
      userToUpdate = {
        id: users[0].id,
        username: users[0].username,
        password: users[0].password,
        roles: users[0].roles,
      };
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          usersController.updateUser(
            { ...users[0], id: users[0].id + 1 },
            userToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and the given user id between param and body are match', () => {
      it(`should return a ${SuccessResponseDto.name} with message`, async () => {
        expect(
          await usersController.updateUser(users[0], userToUpdate),
        ).toStrictEqual(
          new SuccessResponseDto({
            message: 'User updated',
          }),
        );
      });
    });
  });

  describe('when deleteUser is called', () => {
    let usersServiceDeleteSpy: jest.SpyInstance<Promise<boolean>, [id: number]>;

    beforeEach(() => {
      usersServiceDeleteSpy = jest.spyOn(usersService, 'delete');
      usersServiceDeleteSpy.mockResolvedValue(true);
    });

    it(`should return a ${SuccessResponseDto.name} with message`, async () => {
      expect(await usersController.deleteUser(users[0])).toStrictEqual(
        new SuccessResponseDto({
          message: 'User deleted',
        }),
      );
    });
  });
});
