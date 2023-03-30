import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { topicsData } from '../../../database/data/topics.data';
import { Topic } from '../entities/topic.entity';
import { TopicsService } from '../topics.service';

describe(TopicsService.name, () => {
  let topicsService: TopicsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TopicsService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Topic), useValue: mockedRepository },
      ],
    }).compile();

    topicsService = moduleRef.get<TopicsService>(TopicsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${TopicsService.prototype.create.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(topicsData[0]);
    });

    it('should return the created topic', async () => {
      expect(await topicsService.create(topicsData[0])).toBe(topicsData[0]);
    });
  });

  describe(`when ${TopicsService.prototype.findAll.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(topicsData);
    });

    it('should return array of topics', async () => {
      expect(await topicsService.findAll()).toStrictEqual(topicsData);
    });
  });

  describe(`when ${TopicsService.prototype.findByIds.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(topicsData);
    });

    it('should return array of topics', async () => {
      expect(
        await topicsService.findByIds(topicsData.map((topic) => topic.id)),
      ).toStrictEqual(topicsData);
    });
  });

  describe(`when ${TopicsService.prototype.findById.name} is called`, () => {
    describe(`and the topic is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await topicsService.findById(topicsData[0].id)).toBeNull();
      });
    });

    describe(`and the topic is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(topicsData[0]);
      });

      it('should return a topic', async () => {
        expect(await topicsService.findById(topicsData[0].id)).toStrictEqual(
          topicsData[0],
        );
      });
    });
  });

  describe(`when ${TopicsService.prototype.findByName.name} is called`, () => {
    describe(`and the topic is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await topicsService.findByName(topicsData[0].name)).toBeNull();
      });
    });

    describe(`and the topic is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(topicsData[0]);
      });

      it('should return a topic', async () => {
        expect(
          await topicsService.findByName(topicsData[0].name),
        ).toStrictEqual(topicsData[0]);
      });
    });
  });

  describe(`when ${TopicsService.prototype.update.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await topicsService.update(topicsData[0].id, topicsData[0]),
      ).toBeTruthy();
    });
  });

  describe(`when ${TopicsService.prototype.delete.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await topicsService.delete(topicsData[0].id)).toBeTruthy();
    });
  });
});
