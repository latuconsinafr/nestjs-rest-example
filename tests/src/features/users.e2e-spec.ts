import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import * as request from 'supertest';
import { DeepPartial } from 'typeorm';
import { UserRole } from '../../../src/common/enums/user-role.enum';
import { mockedRepository } from '../../../src/common/module-utils/utils/mocks/repository.mock';
import { usersData } from '../../../src/database/data/users.data';
import { User } from '../../../src/features/users/entities/user.entity';
import { UsersModule } from '../../../src/features/users/users.module';

const users = [...usersData];

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockedRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/users (POST)`, () => {
    const userToCreate: DeepPartial<User> = {
      username: 'username',
      password: 'password',
      roles: [UserRole.SuperAdmin],
    };

    mockedRepository.create.mockReturnValue({ id: 1, ...userToCreate });

    return request(app.getHttpServer())
      .post('/users')
      .send(userToCreate)
      .expect(HttpStatus.CREATED)
      .expect({
        message: 'User created',
        data: { id: 1, ...userToCreate },
      });
  });

  it(`/users (GET)`, () => {
    mockedRepository.find.mockResolvedValue(users);

    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .expect({
        message: 'Users retrieved',
        data: instanceToPlain(users),
      });
  });

  it(`/users/${1} (GET)`, () => {
    mockedRepository.findOneBy.mockResolvedValue(
      users.find((user) => user.id === 1),
    );

    return request(app.getHttpServer())
      .get(`/users/${1}`)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User retrieved',
        data: instanceToPlain(users.find((user) => user.id === 1)),
      });
  });

  it(`/users/${1} (PUT)`, () => {
    return request(app.getHttpServer())
      .put(`/users/${1}`)
      .expect(HttpStatus.OK);
  });

  it(`/users/${1} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/users/${1}`)
      .expect(HttpStatus.FORBIDDEN); // * There's an auth decorator above the method
  });
});
