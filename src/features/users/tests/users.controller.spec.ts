import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SuccessResponseDto } from '../../../common/dto/responses/success-response.dto';
import { mockedRepository } from '../../../common/module-utils/utils/mocks/repository.mock';
import { usersData } from '../../../database/data/users.data';
import { CreateUserDto } from '../dto/create-user.dto';
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
    let userToCreate: CreateUserDto;

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
