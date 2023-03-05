import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { localFilesData } from '../../../database/data/local-files.data';
import { LocalFile } from '../entities/local-file.entity';
import { StoragesService } from '../storages.service';

describe(StoragesService.name, () => {
  let storagesService: StoragesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoragesService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(LocalFile), useValue: mockedRepository },
      ],
    }).compile();

    storagesService = moduleRef.get<StoragesService>(StoragesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${StoragesService.prototype.createLocalFile.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(localFilesData[0]);
    });

    it('should return the created local file', async () => {
      expect(await storagesService.createLocalFile(localFilesData[0])).toBe(
        localFilesData[0],
      );
    });
  });

  describe(`when ${StoragesService.prototype.findLocalFileById.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.findOne.mockResolvedValue(localFilesData[0]);
    });

    it('should return a local file', async () => {
      expect(
        await storagesService.findLocalFileById(localFilesData[0].id),
      ).toStrictEqual(localFilesData[0]);
    });
  });

  describe(`when ${StoragesService.prototype.updateLocalFile.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await storagesService.updateLocalFile(
          localFilesData[0].id,
          localFilesData[0],
        ),
      ).toBeTruthy();
    });
  });

  describe(`when ${StoragesService.prototype.deleteLocalFile.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await storagesService.deleteLocalFile(localFilesData[0].id),
      ).toBeTruthy();
    });
  });
});
