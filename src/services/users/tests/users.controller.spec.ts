import { Test } from '@nestjs/testing';
import { SuccessResponseDto } from '../../../common/dto/responses/response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

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

    users = [
      {
        id: 1,
        username: 'user',
        password: 'password',
        description: 'This is user',
      },
    ];
  });

  describe('when createUser is called', () => {
    let userToCreate: CreateUserDto;
    let usersServiceCreateSpy: jest.SpyInstance<void, [user: Omit<User, 'id'>]>;

    beforeEach(() => {
      userToCreate = {
        username: users[0].username,
        password: users[0].password,
      };
      usersServiceCreateSpy = jest.spyOn(usersService, 'create');
    });

    it(`should call ${UsersService.name} create method`, async () => {
      await usersController.createUser(userToCreate);

      expect(usersServiceCreateSpy).toHaveBeenCalledTimes(1);
    });

    it('should return undefined', async () => {
      expect(await usersController.createUser(userToCreate)).toBeUndefined();
    });
  });

  describe('when findAllUsers is called', () => {
    let usersServiceFindAllSpy: jest.SpyInstance<User[], []>;

    beforeEach(() => {
      usersServiceFindAllSpy = jest.spyOn(usersService, 'findAll');
      usersServiceFindAllSpy.mockImplementation(() => users);
    });

    it(`should call ${UsersService.name} findAll method`, async () => {
      await usersController.findAllUsers();

      expect(usersServiceFindAllSpy).toHaveBeenCalledTimes(1);
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
