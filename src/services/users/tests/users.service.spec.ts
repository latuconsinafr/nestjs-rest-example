import { Test } from '@nestjs/testing';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users.service';
import { usersStub } from './stubs/users.stub';

describe('UsersService', () => {
  let usersService: UsersService;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);

    users = [...usersStub];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when create is called', () => {
    it('should return undefined', () => {
      expect(usersService.create(users[0])).toBeUndefined();
    });
  });

  describe('when findAll is called', () => {
    it('should return array of users', () => {
      expect(usersService.findAll()).toStrictEqual(users);
    });
  });

  describe('when findById is called', () => {
    it('should return a user', () => {
      expect(usersService.findById(users[0].id)).toStrictEqual(users[0]);
    });
  });
});
