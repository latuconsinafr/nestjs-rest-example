import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { v4 as uuidv4 } from 'uuid';
import { ValidationArguments } from 'class-validator';
import { IsLocalFileExistValidator } from '../../validators/is-local-file-exist.validator';
import { StoragesService } from '../../storages.service';
import { LocalFile } from '../../entities/local-file.entity';
import { localFilesData } from '../../../../database/data/local-files.data';

describe(IsLocalFileExistValidator.name, () => {
  let isLocalFileExistValidator: IsLocalFileExistValidator;
  let storagesService: StoragesService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsLocalFileExistValidator,
        StoragesService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(LocalFile), useValue: mockedRepository },
      ],
    }).compile();

    isLocalFileExistValidator = moduleRef.get<IsLocalFileExistValidator>(
      IsLocalFileExistValidator,
    );
    storagesService = moduleRef.get<StoragesService>(StoragesService);
    validationArguments = {
      property: 'id',
      value: uuidv4(),
      targetName: 'id',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsLocalFileExistValidator.prototype.validate.name} is called`, () => {
    describe('and the incoming value is not a valid UUID v4', () => {
      it('should return false', async () => {
        expect(await isLocalFileExistValidator.validate('asdasd')).toBeFalsy();
      });
    });

    describe('and the incoming value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the local file is not found', () => {
        it('should return false', async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(null);

          expect(await isLocalFileExistValidator.validate(value)).toBeFalsy();
        });
      });

      describe('and the local file is found', () => {
        it('should return true', async () => {
          jest
            .spyOn(storagesService, 'findLocalFileById')
            .mockResolvedValue(localFilesData[0]);

          expect(await isLocalFileExistValidator.validate(value)).toBeTruthy();
        });
      });
    });
  });

  describe(`when ${IsLocalFileExistValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isLocalFileExistValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `file with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
