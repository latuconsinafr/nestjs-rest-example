import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessService } from 'nest-casl';
import { PinoLogger } from 'nestjs-pino';
import { SuccessResponse } from '../../../common/dto/responses/success-response.dto';
import { ConflictException } from '../../../common/exceptions/conflict.exception';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { topicsData } from '../../../database/data/topics.data';
import { CreateTopicRequest } from '../dto/requests/create-topic-request.dto';
import { UpdateTopicRequest } from '../dto/requests/update-topic-request.dto';
import { Topic } from '../entities/topic.entity';
import { TopicsController } from '../topics.controller';
import { TopicsService } from '../topics.service';

describe(TopicsController.name, () => {
  let topicsController: TopicsController;
  let topicsService: TopicsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        TopicsService,
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
        {
          provide: AccessService,
          useValue: {},
        },
      ],
    }).compile();

    topicsService = moduleRef.get<TopicsService>(TopicsService);
    topicsController = moduleRef.get<TopicsController>(TopicsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TopicsController.prototype.createTopic.name} is called`, () => {
    let topicToCreate: CreateTopicRequest;
    let topicsServiceCreateSpy: jest.SpyInstance<
      Promise<Topic>,
      [topic: Topic]
    >;

    beforeEach(() => {
      topicToCreate = {
        ...topicsData[0],
      };
      topicsServiceCreateSpy = jest.spyOn(topicsService, 'create');
      topicsServiceCreateSpy.mockResolvedValue(topicsData[0]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(topicsService, 'create').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          topicsController.createTopic(topicToCreate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${TopicsService.name} ${TopicsService.prototype.create.name} method`, async () => {
        await topicsController.createTopic(topicToCreate);

        expect(topicsServiceCreateSpy).toBeCalledTimes(1);
      });

      it('should return a message and data contains the created topic', async () => {
        expect(await topicsController.createTopic(topicToCreate)).toStrictEqual(
          new SuccessResponse({
            message: 'Topic created',
            data: topicsData[0],
          }),
        );
      });
    });
  });

  describe(`when ${TopicsController.prototype.findAllTopics.name} is called`, () => {
    let topicsServiceFindAllSpy: jest.SpyInstance<Promise<Topic[]>, []>;

    beforeEach(() => {
      topicsServiceFindAllSpy = jest.spyOn(topicsService, 'findAll');
      topicsServiceFindAllSpy.mockResolvedValue([...topicsData]);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest
          .spyOn(topicsService, 'findAll')
          .mockImplementationOnce(async () => {
            throw new Error();
          });

        await expect(topicsController.findAllTopics()).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${TopicsService.name} ${TopicsService.prototype.findAll.name} method`, async () => {
        await topicsController.findAllTopics();

        expect(topicsServiceFindAllSpy).toBeCalledTimes(1);
      });

      it(`should return a message and data contains array of topics`, async () => {
        expect(await topicsController.findAllTopics()).toStrictEqual(
          new SuccessResponse({
            message: 'Topics retrieved',
            data: topicsData,
          }),
        );
      });
    });
  });

  describe(`when ${TopicsController.prototype.findTopicById.name} is called`, () => {
    it(`should return a message and data contains a topic`, async () => {
      expect(await topicsController.findTopicById(topicsData[0])).toStrictEqual(
        new SuccessResponse({
          message: 'Topic retrieved',
          data: topicsData[0],
        }),
      );
    });
  });

  describe(`when ${TopicsController.prototype.updateTopic.name} is called`, () => {
    let topicToUpdate: UpdateTopicRequest;
    let topicsServiceUpdateSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string, topic: Topic]
    >;

    beforeEach(() => {
      topicToUpdate = { ...topicsData[0] };
      topicsServiceUpdateSpy = jest.spyOn(topicsService, 'update');
      topicsServiceUpdateSpy.mockResolvedValue(true);
    });

    describe('and the given user id between param and body are different', () => {
      it(`should throw ${ConflictException.name}`, async () => {
        await expect(
          topicsController.updateTopic(
            {
              ...topicsData[1],
            },
            topicToUpdate,
          ),
        ).rejects.toThrow(ConflictException);
      });
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(topicsService, 'update').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          topicsController.updateTopic(topicsData[0], topicToUpdate),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${TopicsService.name} ${TopicsService.prototype.update.name} method`, async () => {
        await topicsController.updateTopic(topicsData[0], topicToUpdate);

        expect(topicsServiceUpdateSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(
          await topicsController.updateTopic(topicsData[0], topicToUpdate),
        ).toStrictEqual(
          new SuccessResponse({
            message: 'Topic updated',
          }),
        );
      });
    });
  });

  describe(`when ${TopicsController.prototype.deleteTopic.name} is called`, () => {
    let topicsServiceDeleteSpy: jest.SpyInstance<
      Promise<boolean>,
      [id: string]
    >;

    beforeEach(() => {
      topicsServiceDeleteSpy = jest.spyOn(topicsService, 'delete');
      topicsServiceDeleteSpy.mockResolvedValue(true);
    });

    describe('and when error occurred', () => {
      it(`should throw ${InternalServerErrorException.name}`, async () => {
        jest.spyOn(topicsService, 'delete').mockImplementationOnce(async () => {
          throw new Error();
        });

        await expect(
          topicsController.deleteTopic(topicsData[0]),
        ).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('and when no error occurred', () => {
      it(`should call ${TopicsService.name} ${TopicsService.prototype.delete.name} method`, async () => {
        await topicsController.deleteTopic(topicsData[0]);

        expect(topicsServiceDeleteSpy).toBeCalledTimes(1);
      });

      it(`should return a message`, async () => {
        expect(await topicsController.deleteTopic(topicsData[0])).toStrictEqual(
          new SuccessResponse({
            message: 'Topic deleted',
          }),
        );
      });
    });
  });
});
