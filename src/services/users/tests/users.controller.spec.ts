import { Test } from '@nestjs/testing';
import { SuccessResponseDto } from '../../../common/dto/responses/response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { usersStub } from './stubs/users.stub';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);

    users = [...usersStub];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when createUser is called', () => {
    let usersServiceCreateSpy: jest.SpyInstance<void, [user: Omit<User, 'id'>]>;
    let userToCreate: CreateUserDto;

    beforeEach(() => {
      usersServiceCreateSpy = jest.spyOn(usersService, 'create');
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

    it('should return undefined', async () => {
      expect(await usersController.createUser(userToCreate)).toBeUndefined();
    });
  });

  describe('when findAllUsers is called', () => {
    let usersServiceFindAllSpy: jest.SpyInstance<User[], []>;

    beforeEach(() => {
      usersServiceFindAllSpy = jest.spyOn(usersService, 'findAll');
      usersServiceFindAllSpy.mockReturnValue(users);
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
    it(`should return a ${SuccessResponseDto.name} with message and data contains user`, () => {
      expect(usersController.findUserById(users[0])).toStrictEqual(
        new SuccessResponseDto({
          message: 'User retrieved',
          data: users[0],
        }),
      );
    });
  });

  describe('when updateUser is called', () => {
    it(`should return a string message`, () => {
      const id = 1;

      expect(usersController.updateUser(id)).toBe(
        `This action updates a #${id} user.`,
      );
    });
  });

  describe('when removeUser is called', () => {
    it(`should return a string message`, () => {
      const id = 1;

      expect(usersController.removeUser(id)).toBe(
        `This action removes a #${id} user.`,
      );
    });
  });
});
