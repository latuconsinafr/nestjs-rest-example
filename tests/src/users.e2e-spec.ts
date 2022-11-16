import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../../src/features/users/users.module';
import { UsersService } from '../../src/features/users/users.service';

describe('Users', () => {
  let app: INestApplication;
  const users = [
    {
      id: 1,
      username: 'user',
      password: 'password',
      description: 'This is user',
    },
  ];
  const usersService = {
    create: () => undefined,
    findAll: () => users,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findById: (id: number) => users[0],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/users (POST)`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'username',
        password: 'password',
        description: 'description',
      })
      .expect(HttpStatus.CREATED)
      .expect({});
  });

  it(`/users (GET)`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .expect({
        message: 'Users retrieved',
        data: usersService.findAll(),
      });
  });

  it(`/users/1 (GET)`, () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(HttpStatus.OK)
      .expect({
        message: 'User retrieved',
        data: usersService.findById(1),
      });
  });

  it(`/users/1 (PUT)`, () => {
    return request(app.getHttpServer())
      .put('/users/1')
      .send({
        username: 'username',
        password: 'password',
        description: 'description',
      })
      .expect(HttpStatus.OK)
      .expect('This action updates a #1 user.');
  });

  it(`/users/1 (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(HttpStatus.OK)
      .expect('This action removes a #1 user.');
  });
});
