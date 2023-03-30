import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { Topic } from '../../entities/topic.entity';
import { TopicsService } from '../../topics.service';
import { v4 as uuidv4 } from 'uuid';
import { topicsData } from '../../../../database/data/topics.data';
import { IsNameUniqueValidator } from '../../validators/is-name-unique.validator';

describe(IsNameUniqueValidator.name, () => {
  let isNameUniqueValidator: IsNameUniqueValidator;
  let topicsService: TopicsService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsNameUniqueValidator,
        TopicsService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
      ],
    }).compile();

    isNameUniqueValidator = moduleRef.get<IsNameUniqueValidator>(
      IsNameUniqueValidator,
    );
    topicsService = moduleRef.get<TopicsService>(TopicsService);
    validationArguments = {
      property: 'name',
      value: uuidv4(),
      targetName: 'name',
      constraints: [],
      object: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${IsNameUniqueValidator.prototype.validate.name} is called`, () => {
    describe('and the topic is not found', () => {
      it('should return true', async () => {
        jest.spyOn(topicsService, 'findByName').mockResolvedValue(null);

        expect(
          await isNameUniqueValidator.validate(topicsData[0].name),
        ).toBeTruthy();
      });
    });

    describe('and the topic is found', () => {
      beforeEach(() => {
        jest
          .spyOn(topicsService, 'findByName')
          .mockResolvedValue(topicsData[0]);
      });

      describe('and the identifier key is not provided', () => {
        it('should return false', async () => {
          expect(
            await isNameUniqueValidator.validate(
              topicsData[0].name,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the object is not provided', () => {
        it('should return false', async () => {
          expect(
            await isNameUniqueValidator.validate(
              topicsData[0].name,
              validationArguments,
            ),
          ).toBeFalsy();
        });
      });

      describe('and the identifier key is provided', () => {
        beforeEach(() => {
          validationArguments.constraints = ['name'];
        });

        describe('and the object is provided', () => {
          describe('and the value of object of identifier key is not equal with the value of topic of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { name: topicsData[1].name };
            });

            it('should return false', async () => {
              expect(
                await isNameUniqueValidator.validate(
                  topicsData[0].name,
                  validationArguments,
                ),
              ).toBeFalsy();
            });
          });

          describe('and the value of object of identifier key is equal with the value of topic of identifier key', () => {
            beforeEach(() => {
              validationArguments.object = { name: topicsData[0].name };
            });

            it('should return true', async () => {
              expect(
                await isNameUniqueValidator.validate(
                  topicsData[0].name,
                  validationArguments,
                ),
              ).toBeTruthy();
            });
          });
        });
      });
    });
  });

  describe(`when ${IsNameUniqueValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isNameUniqueValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `topic with ${validationArguments?.property} ${validationArguments?.value} already exists`,
      );
    });
  });
});
