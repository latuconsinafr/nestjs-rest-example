import { StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Readable } from 'stream';
import { mockedLogger } from '../../../common/utils/mocks/logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/repository.mock';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesController } from '../storages.controller';
import { StoragesService } from '../storages.service';
import * as fs from 'fs';
import { localFilesData } from '../../../database/data/local-files.data';
import { mockedFs } from '../../../common/utils/mocks/fs.mock';
import { response } from 'express';
import { mockedResponse } from '../../../common/utils/mocks/response.mock';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';

describe('StoragesController', () => {
  let storagesController: StoragesController;
  let localFile: LocalFile;
  let file: Express.Multer.File;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StoragesController],
      providers: [
        {
          provide: PinoLogger,
          useValue: mockedLogger,
        },
        StoragesService,
        {
          provide: getRepositoryToken(LocalFile),
          useValue: mockedRepository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return {
                dest: './uploads',
              };
            }),
          },
        },
      ],
    }).compile();

    storagesController = moduleRef.get<StoragesController>(StoragesController);

    localFile = localFilesData[0];

    file = {
      fieldname: 'avatar',
      originalname: localFile.fileName,
      encoding: 'base64',
      mimetype: localFile.mimeType,
      buffer: Buffer.from('test'),
      size: 51828,
    } as Express.Multer.File;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when findLocalFileById is called', () => {
    beforeEach(() => {
      (response.set as jest.Mock) = mockedResponse.set;
    });

    describe('and the streamable file does not exist', () => {
      beforeEach(() => {
        mockedFs.existsSync.mockReturnValue(false);
        (fs.existsSync as jest.Mock) = mockedFs.existsSync;
      });

      it(`should throw ${NotFoundException.name}`, async () => {
        await expect(
          storagesController.findLocalFileById(
            localFile,
            mockedResponse as any,
          ),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('and the streamable file does exist', () => {
      beforeEach(() => {
        mockedFs.existsSync.mockReturnValue(true);
        (fs.existsSync as jest.Mock) = mockedFs.existsSync;
      });

      describe('and when an error occurred', () => {
        it(`should throw ${InternalServerErrorException.name}`, async () => {
          mockedFs.createReadStream.mockImplementation(() => {
            throw new Error();
          });
          (fs.createReadStream as jest.Mock) = mockedFs.createReadStream;

          await expect(
            storagesController.findLocalFileById(
              localFile,
              mockedResponse as any,
            ),
          ).rejects.toThrow(InternalServerErrorException);
        });
      });

      describe('and no error occurred', () => {
        it('return a streamable file', async () => {
          const stream = Readable.from([file]);

          mockedFs.createReadStream.mockReturnValue(stream);
          (fs.createReadStream as jest.Mock) = mockedFs.createReadStream;

          // ? Finally it has to be stringified.
          // ? Since, even thou they have an equal value, the Jest keeps on telling me something like 'serializes to the same string'?
          expect(
            JSON.stringify(
              await storagesController.findLocalFileById(
                localFile,
                mockedResponse as any,
              ),
            ),
          ).toEqual(JSON.stringify(new StreamableFile(stream)));
        });
      });
    });
  });
});
