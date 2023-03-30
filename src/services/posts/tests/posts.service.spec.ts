import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { mockedPinoLogger } from '../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../common/utils/mocks/typeorm/repository.mock';
import { postsData } from '../../../database/data/posts.data';
import { topicsData } from '../../../database/data/topics.data';
import { Post } from '../entities/post.entity';
import { PostsService } from '../posts.service';

describe(PostsService.name, () => {
  let postsService: PostsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        { provide: getRepositoryToken(Post), useValue: mockedRepository },
      ],
    }).compile();

    postsService = moduleRef.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${PostsService.prototype.create.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.create.mockReturnValue(postsData[0]);
    });

    it('should return the created post', async () => {
      expect(await postsService.create(postsData[0])).toBe(postsData[0]);
    });
  });

  describe(`when ${PostsService.prototype.findAll.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.find.mockResolvedValue(postsData);
    });

    it('should return array of posts', async () => {
      expect(await postsService.findAll()).toStrictEqual(postsData);
    });
  });

  describe(`when ${PostsService.prototype.findById.name} is called`, () => {
    describe(`and the post is not found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(null);
      });

      it('should return null', async () => {
        expect(await postsService.findById(postsData[0].id)).toBeNull();
      });
    });

    describe(`and the post is found`, () => {
      beforeEach(() => {
        mockedRepository.findOne.mockResolvedValue(postsData[0]);
      });

      it('should return a post', async () => {
        expect(await postsService.findById(postsData[0].id)).toStrictEqual(
          postsData[0],
        );
      });
    });
  });

  describe(`when ${PostsService.prototype.update.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.update.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await postsService.update(postsData[0].id, postsData[0]),
      ).toBeTruthy();
    });
  });

  describe(`when ${PostsService.prototype.delete.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.delete.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(await postsService.delete(postsData[0].id)).toBeTruthy();
    });
  });

  describe(`when ${PostsService.prototype.updateTopics.name} is called`, () => {
    beforeEach(() => {
      mockedRepository.save.mockResolvedValue(true);
    });

    it('should return true', async () => {
      expect(
        await postsService.updateTopics(postsData[0].id, [...topicsData]),
      ).toBeTruthy();
    });
  });
});
