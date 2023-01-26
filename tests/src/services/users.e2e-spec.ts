import * as request from 'supertest';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { AppModule } from '../../../src/app.module';
import { mockedRepository } from '../../../src/common/utils/mocks/repository.mock';
import { usersData } from '../../../src/database/data/users.data';
import { UserProfile } from '../../../src/services/users/entities/user-profile.entity';
import { User } from '../../../src/services/users/entities/user.entity';
import { userProfilesData } from '../../../src/database/data/user-profiles.data';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '../../../src/common/exceptions/unprocessable-entity.exception';
import { localFilesData } from '../../../src/database/data/local-files.data';

const users = [...usersData];
const userProfiles = [...userProfilesData];
const localFiles = [...localFilesData];

const userId = users[0].id;

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
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors: ValidationError[]) => {
          return new UnprocessableEntityException({}, errors);
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/users (POST)`, () => {
    const userToCreate: DeepPartial<User> = {
      ...users[0],
      profile: {
        ...userProfiles[0],
      },
    };

    mockedRepository.create.mockReturnValue({
      ...userToCreate,
      profile: { ...userProfiles[0] },
    });

    return request(app.getHttpServer())
      .post('/users')
      .send(userToCreate)
      .expect(HttpStatus.CREATED)
      .expect({
        message: 'User created',
        data: {
          ...userToCreate,
          profile: {
            ...userProfiles[0],
            birthDate: userProfiles[0].birthDate.toISOString(),
          },
        },
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

  it(`/users/${userId} (GET)`, () => {
    mockedRepository.findOne.mockResolvedValue(
      users.find((user) => user.id === userId),
    );

    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User retrieved',
        data: { ...users.find((user) => user.id === userId) },
      });
  });

  it(`/users/${userId} (PUT)`, () => {
    const userToUpdate: DeepPartial<User> = {
      ...users[0],
    };

    mockedRepository.update.mockReturnValue(userToUpdate);

    return request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(userToUpdate)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User updated',
      });
  });

  it(`/users/${userId} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(HttpStatus.FORBIDDEN); // * There's an auth decorator above the method
  });

  it(`/users/profile/${userId} (PUT)`, () => {
    const userProfileToUpdate: DeepPartial<UserProfile> = {
      ...userProfiles[0],
    };

    mockedRepository.update.mockReturnValue(userProfileToUpdate);

    return request(app.getHttpServer())
      .put(`/users/profile/${userId}`)
      .send(userProfileToUpdate)
      .expect(HttpStatus.OK)
      .expect({
        message: 'User profile updated',
      });
  });

  it(`/users/profile/${userId}/avatar/upload (PUT)`, () => {
    mockedRepository.update.mockReturnValue({ ...userProfiles[0] });

    return request(app.getHttpServer())
      .put(`/users/profile/${userId}/avatar/upload`)
      .field('id', userId)
      .attach(
        'avatar',
        `${__dirname}/../../../src/database/data/${localFiles[0].path}`,
      )
      .expect(HttpStatus.OK)
      .expect({
        message: 'User profile avatar updated',
      });
  });
});
