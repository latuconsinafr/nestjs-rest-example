import { Test } from '@nestjs/testing';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let users: User[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);

    users = [
      {
        id: 1,
        username: 'user',
        password: 'password',
        description: 'This is user',
      },
    ];
  });

  describe('when create is called', () => {
    it('should return undefined', async () => {
      expect(usersService.create(users[0])).toBeUndefined();
    });
  });

  describe('when findAll is called', () => {
    it('should return array of users', async () => {
      expect(usersService.findAll()).toStrictEqual(users);
    });
  });

  describe('when findById is called', () => {
    it('should return a user', async () => {
      expect(usersService.findById(users[0].id)).toStrictEqual(users[0]);
    });
  });
});
