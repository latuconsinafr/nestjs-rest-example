import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { Topic } from '../../entities/topic.entity';
import { TopicByIdPipe } from '../../pipes/topic-by-id.pipe';
import { TopicsService } from '../../topics.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { topicsData } from '../../../../database/data/topics.data';

describe(TopicByIdPipe.name, () => {
  let topicByIdPipe: TopicByIdPipe;
  let topicsService: TopicsService;
  let argumentMetaData: ArgumentMetadata;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TopicByIdPipe,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        TopicsService,
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
      ],
    }).compile();

    topicByIdPipe = moduleRef.get<TopicByIdPipe>(TopicByIdPipe);
    topicsService = moduleRef.get<TopicsService>(TopicsService);

    argumentMetaData = {
      type: 'param',
      metatype: String,
      data: 'id',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TopicByIdPipe.prototype.transform.name} is called`, () => {
    describe('and the given value is not a valid UUID v4', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        await expect(
          topicByIdPipe.transform('asdxxxasd', argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the given value a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the topic is not found', () => {
        it(`should throw ${NotFoundException.name}`, async () => {
          jest.spyOn(topicsService, 'findById').mockResolvedValue(null);

          await expect(
            topicByIdPipe.transform(value, argumentMetaData),
          ).rejects.toThrow(NotFoundException);
        });
      });

      describe('and the topic is found', () => {
        it(`should return the topic`, async () => {
          jest
            .spyOn(topicsService, 'findById')
            .mockResolvedValue(topicsData[0]);

          expect(
            await topicByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(topicsData[0]);
        });
      });
    });
  });
});
