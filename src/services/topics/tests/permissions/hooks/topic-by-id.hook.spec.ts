import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../../common/utils/mocks/typeorm/repository.mock';
import { Topic } from '../../../entities/topic.entity';
import { TopicByIdHook } from '../../../permissions/hooks/topic-by-id.hook';
import { TopicsService } from '../../../topics.service';
import { Request } from 'nest-casl';
import { topicsData } from '../../../../../database/data/topics.data';

describe(TopicByIdHook.name, () => {
  let topicByIdHook: TopicByIdHook;
  let topicsService: TopicsService;
  let request: Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TopicByIdHook,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        TopicsService,
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
      ],
    }).compile();

    topicByIdHook = moduleRef.get<TopicByIdHook>(TopicByIdHook);
    topicsService = moduleRef.get<TopicsService>(TopicsService);

    request = {
      casl: {} as any,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TopicByIdHook.prototype.run.name} is called`, () => {
    describe('and the topic is not found', () => {
      it(`should return undefined`, async () => {
        jest.spyOn(topicsService, 'findById').mockResolvedValue(null);

        expect(
          await topicByIdHook.run({ ...request, params: topicsData[0].id }),
        ).toBeUndefined();
      });
    });

    describe('and the topic is found', () => {
      it(`should return the topic`, async () => {
        jest.spyOn(topicsService, 'findById').mockResolvedValue(topicsData[0]);

        expect(
          await topicByIdHook.run({ ...request, params: topicsData[0].id }),
        ).toStrictEqual(topicsData[0]);
      });
    });
  });
});
