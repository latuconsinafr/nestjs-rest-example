import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PinoLogger } from 'nestjs-pino';
import { mockedLogger } from '../../src/common/utils/mocks/logger.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PinoLogger)
      .useValue(mockedLogger)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/ (GET)`, () => {
    return request(app.getHttpServer()).get('/').expect(HttpStatus.OK);
  });

  it('/docs (GET)', () => {
    return request(app.getHttpServer()).get('/docs').expect(HttpStatus.FOUND);
  });
});
