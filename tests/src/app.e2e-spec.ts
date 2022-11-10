import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const now = new Date('2020-01-01');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    jest.useFakeTimers().setSystemTime(now);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(HttpStatus.OK);
  });

  it('/docs (GET)', () => {
    return request(app.getHttpServer()).get('/docs').expect(HttpStatus.FOUND);
  });
});
