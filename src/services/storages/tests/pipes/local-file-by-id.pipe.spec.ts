import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { LocalFile } from '../../entities/local-file.entity';
import { LocalFileByIdPipe } from '../../pipes/local-file-by-id.pipe';
import { StoragesService } from '../../storages.service';
import { v4 as uuidv4 } from 'uuid';
import { localFilesData } from '../../../../database/data/local-files.data';

describe(LocalFileByIdPipe.name, () => {
  let localFileByIdPipe: LocalFileByIdPipe;
  let storagesService: StoragesService;
  let argumentMetaData: ArgumentMetadata;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocalFileByIdPipe,
        { provide: PinoLogger, useValue: mockedPinoLogger },
        StoragesService,
        { provide: getRepositoryToken(LocalFile), useValue: mockedRepository },
      ],
    }).compile();

    localFileByIdPipe = moduleRef.get<LocalFileByIdPipe>(LocalFileByIdPipe);
    storagesService = moduleRef.get<StoragesService>(StoragesService);

    argumentMetaData = {
      type: 'param',
      metatype: Number,
      data: 'id',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${LocalFileByIdPipe.prototype.transform.name} is called`, () => {
    describe('and the given value is not a valid UUID v4', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        await expect(
          localFileByIdPipe.transform('asdxxasd', argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the given value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the local file is not found', () => {
        it(`should throw ${NotFoundException.name}`, async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(null);

          await expect(
            localFileByIdPipe.transform(value, argumentMetaData),
          ).rejects.toThrow(NotFoundException);
        });
      });

      describe('and the local file is found', () => {
        it(`should return the local file`, async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(localFilesData[0]);

          expect(
            await localFileByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(localFilesData[0]);
        });
      });
    });
  });
});
