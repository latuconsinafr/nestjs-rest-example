import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValidationArguments } from 'class-validator';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { Topic } from '../../entities/topic.entity';
import { TopicsService } from '../../topics.service';
import { IsTopicExistValidator } from '../../validators/is-topic-exist.validator';
import { v4 as uuidv4 } from 'uuid';
import { topicsData } from '../../../../database/data/topics.data';

describe(IsTopicExistValidator.name, () => {
  let isTopicExistValidator: IsTopicExistValidator;
  let topicsService: TopicsService;
  let validationArguments: ValidationArguments;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        IsTopicExistValidator,
        TopicsService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
      ],
    }).compile();

    isTopicExistValidator = moduleRef.get<IsTopicExistValidator>(
      IsTopicExistValidator,
    );
    topicsService = moduleRef.get<TopicsService>(TopicsService);
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

  describe(`when ${IsTopicExistValidator.prototype.validate.name} is called`, () => {
    describe('and the incoming value is not a valid UUID v4', () => {
      it('should return false', async () => {
        expect(await isTopicExistValidator.validate('asdasd')).toBeFalsy();
      });
    });

    describe('and the incoming value is a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the topic is not found', () => {
        it('should return false', async () => {
          jest.spyOn(topicsService, 'findById').mockResolvedValue(null);

          expect(await isTopicExistValidator.validate(value)).toBeFalsy();
        });
      });

      describe('and the topic is found', () => {
        it('should return true', async () => {
          jest
            .spyOn(topicsService, 'findById')
            .mockResolvedValue(topicsData[0]);

          expect(await isTopicExistValidator.validate(value)).toBeTruthy();
        });
      });
    });
  });

  describe(`when ${IsTopicExistValidator.prototype.defaultMessage.name} is called`, () => {
    it('should return the correct validation error message', () => {
      expect(
        isTopicExistValidator.defaultMessage(validationArguments),
      ).toStrictEqual(
        `topic with ${validationArguments?.property} ${validationArguments?.value} doesn't exist`,
      );
    });
  });
});
