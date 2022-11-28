import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DeepPartial } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { UserRole } from '../../../src/common/enums/user-role.enum';
import { mockedRepository } from '../../../src/common/utils/mocks/repository.mock';
import { usersData } from '../../../src/database/data/users.data';
import { UserProfile } from '../../../src/services/users/entities/user-profile.entity';
import { User } from '../../../src/services/users/entities/user.entity';

const users = [...usersData];

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockedRepository)
      .overrideProvider(getRepositoryToken(UserProfile))
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
      email: 'mail@mail.com',
      phone: '+6282246924950',
      password: 'password',
      roles: [UserRole.User],
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
        // * Replacement of instance to plain,
        // * since `instanceToPlain()` is also transforming the value with @Exclude() and @Expose() decorator
        data: users.map((user) => {
          return { ...user };
        }),
      });
  });

  it(`/users/${1} (GET)`, () => {
    mockedRepository.findOne.mockResolvedValue(
      users.find((user) => user.id === 1),
    );

    return request(app.getHttpServer())
      .get(`/users/${1}`)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User retrieved',
        data: { ...users.find((user) => user.id === 1) },
      });
  });

  it(`/users/${1} (PUT)`, () => {
    const userToUpdate: DeepPartial<User> = {
      id: 1,
      username: 'username',
      email: 'mail@mail.com',
      phone: '+6282246924950',
      password: 'password',
      roles: [UserRole.User],
    };

    mockedRepository.update.mockReturnValue(userToUpdate);

    return request(app.getHttpServer())
      .put(`/users/${1}`)
      .send(userToUpdate)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User updated',
      });
  });

  it(`/users/${1} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/users/${1}`)
      .expect(HttpStatus.FORBIDDEN); // * There's an auth decorator above the method
  });

  it(`/users/profile/${1} (PUT)`, () => {
    const userProfileToUpdate: DeepPartial<UserProfile> = {
      id: 1,
      firstName: 'New',
      lastName: 'User',
      bio: null,
      location: 'Indonesia',
      website: null,
      birthDate: new Date('1995-08-06'),
    };

    mockedRepository.update.mockReturnValue(userProfileToUpdate);

    return request(app.getHttpServer())
      .put(`/users/profile/${1}`)
      .send(userProfileToUpdate)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User profile updated',
      });
  });
});
