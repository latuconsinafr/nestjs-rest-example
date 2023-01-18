import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { FileGeneralAccess } from '../../../../common/enums/file-general-access.enum';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedLogger } from '../../../../common/utils/mocks/logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/repository.mock';
import { LocalFile } from '../../entities/local-file.entity';
import { LocalFileByIdPipe } from '../../pipes/local-file-by-id.pipe';
import { StoragesService } from '../../storages.service';

describe('LocalFileByIdPipe', () => {
  let localFileByIdPipe: LocalFileByIdPipe;
  let storagesService: StoragesService;
  let argumentMetaData: ArgumentMetadata;
  let localFile: LocalFile;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocalFileByIdPipe,
        StoragesService,
        { provide: PinoLogger, useValue: mockedLogger },
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
    localFile = {
      id: 1,
      fileName: 'avatar.jpg',
      path: '/users/profiles/avatars',
      mimeType: 'image/jpg',
      generalAccess: FileGeneralAccess.Public,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when transform is called', () => {
    describe('and the string value is unable to be parsed to int', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        const value = 'asdxxasd';

        await expect(
          localFileByIdPipe.transform(value, argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the string value is able to be parsed to int', () => {
      let value: string;

      beforeEach(() => {
        value = '1';
      });

      describe('and the user is not found', () => {
        it(`should throw ${NotFoundException.name}`, async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(null);

          await expect(
            localFileByIdPipe.transform(value, argumentMetaData),
          ).rejects.toThrow(NotFoundException);
        });
      });

      describe('and the user is found', () => {
        it(`should return the user`, async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(localFile);

          expect(
            await localFileByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(localFile);
        });
      });
    });
  });
});
