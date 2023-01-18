import { StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Readable } from 'stream';
import { FileGeneralAccess } from '../../../common/enums/file-general-access.enum';
import { mockedLogger } from '../../../common/utils/mocks/logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/repository.mock';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesController } from '../storages.controller';
import { StoragesService } from '../storages.service';
import * as fs from 'fs';

describe('StoragesController', () => {
  let storagesController: StoragesController;
  let storagesService: StoragesService;
  let file: Express.Multer.File;
  let localFile: LocalFile;
  let existsSyncSpy: jest.SpyInstance<any>;
  let createReadStreamSpy: jest.SpyInstance<any>;

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

    storagesService = moduleRef.get<StoragesService>(StoragesService);
    storagesController = moduleRef.get<StoragesController>(StoragesController);

    file = {
      fieldname: 'avatar',
      originalname: 'avatar.jpg',
      encoding: 'base64',
      mimetype: 'image/jpg',
      buffer: Buffer.from('test'),
      size: 51828,
    } as Express.Multer.File;
    localFile = {
      id: 1,
      fileName: file.originalname,
      path: '/users/profiles/avatars',
      mimeType: file.mimetype,
      generalAccess: FileGeneralAccess.Public,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when findLocalFileById is called', () => {
    it(`should return a streamable file`, async () => {
      existsSyncSpy = jest.spyOn(fs, 'existsSync');
      existsSyncSpy.mockReturnValueOnce(true);

      createReadStreamSpy = jest.spyOn(fs, 'createReadStream');
      createReadStreamSpy.mockReturnValueOnce(Readable.from([file]));

      expect(
        await storagesController.findLocalFileById(localFile, {} as any),
      ).toStrictEqual(new StreamableFile(Readable.from([file])));
    });
  });
});
