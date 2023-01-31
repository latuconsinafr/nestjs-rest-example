import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../../../src/app.module';
import { mockedRepository } from '../../../src/common/utils/mocks/repository.mock';
import { localFilesData } from '../../../src/database/data/local-files.data';
import { LocalFile } from '../../../src/services/storages/entities/local-file.entity';

const localFiles = [...localFilesData];

const localFileId = localFiles[0].id;

describe('Storages', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(LocalFile))
      .useValue(mockedRepository)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/storages/${localFileId} (GET)`, () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = localFiles.find((file) => file.id === localFileId)!;

    mockedRepository.findOne.mockResolvedValue(file);

    return request(app.getHttpServer())
      .get(`/storages/${localFileId}`)
      .expect('Content-Type', file.mimeType)
      .expect('Content-Disposition', `inline; filename="${file.fileName}"`)
      .expect(HttpStatus.OK);
  });
});
