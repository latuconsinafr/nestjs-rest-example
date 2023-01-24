import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedLogger } from '../../../common/utils/mocks/logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/repository.mock';
import { localFilesData } from '../../../database/data/local-files.data';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesService } from '../storages.service';

describe('StoragesService', () => {
  let storagesService: StoragesService;
  let localFile: LocalFile;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoragesService,
        {
          provide: PinoLogger,
          useValue: mockedLogger,
        },
        { provide: getRepositoryToken(LocalFile), useValue: mockedRepository },
      ],
    }).compile();

    storagesService = moduleRef.get<StoragesService>(StoragesService);

    localFile = localFilesData[0];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when createLocalFile is called', () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(localFile);
    });

    it('should return the created local file', async () => {
      expect(await storagesService.createLocalFile(localFile)).toBe(localFile);
    });
  });

  describe('when findLocalFileById is called', () => {
    beforeEach(() => {
      mockedRepository.findOne.mockResolvedValue(localFile);
    });

    it('should return a local file', async () => {
      expect(
        await storagesService.findLocalFileById(localFile.id),
      ).toStrictEqual(localFile);
    });
  });

  describe('when updateLocalFile is called', () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await storagesService.updateLocalFile(localFile.id, localFile),
      ).toBeTruthy();
    });
  });

  describe('when deleteLocalFile is called', () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await storagesService.deleteLocalFile(localFile.id)).toBeTruthy();
    });
  });
});
