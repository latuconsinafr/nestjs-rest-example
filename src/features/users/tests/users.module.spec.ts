import { Test } from '@nestjs/testing';
import { UsersModule } from '../users.module';

describe('UsersModule', () => {
  let usersModule: UsersModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersModule],
    }).compile();

    usersModule = moduleRef.get<UsersModule>(UsersModule);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersModule).toBeDefined();
  });
});
