import { ArgumentMetadata } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '../../../../common/exceptions/not-found.exception';
import { UnprocessableEntityException } from '../../../../common/exceptions/unprocessable-entity.exception';
import { mockedPinoLogger } from '../../../../common/utils/mocks/nestjs-pino/pino-logger.mock';
import { mockedRepository } from '../../../../common/utils/mocks/typeorm/repository.mock';
import { postsData } from '../../../../database/data/posts.data';
import { Post } from '../../entities/post.entity';
import { PostByIdPipe } from '../../pipes/post-by-id.pipe';
import { PostsService } from '../../posts.service';

describe(PostByIdPipe.name, () => {
  let postByIdPipe: PostByIdPipe;
  let postsService: PostsService;
  let argumentMetaData: ArgumentMetadata;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostByIdPipe,
        {
          provide: PinoLogger,
          useValue: mockedPinoLogger,
        },
        PostsService,
        { provide: getRepositoryToken(Post), useValue: mockedRepository },
      ],
    }).compile();

    postByIdPipe = moduleRef.get<PostByIdPipe>(PostByIdPipe);
    postsService = moduleRef.get<PostsService>(PostsService);

    argumentMetaData = {
      type: 'param',
      metatype: String,
      data: 'id',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(`when ${PostByIdPipe.prototype.transform.name} is called`, () => {
    describe('and the given value is not a valid UUID v4', () => {
      it(`should throw ${UnprocessableEntityException.name}`, async () => {
        await expect(
          postByIdPipe.transform('asdxxxasd', argumentMetaData),
        ).rejects.toThrow(UnprocessableEntityException);
      });
    });

    describe('and the given value a valid UUID v4', () => {
      let value: string;

      beforeEach(() => {
        value = uuidv4();
      });

      describe('and the post is not found', () => {
        it(`should throw ${NotFoundException.name}`, async () => {
          jest.spyOn(postsService, 'findById').mockResolvedValue(null);

          await expect(
            postByIdPipe.transform(value, argumentMetaData),
          ).rejects.toThrow(NotFoundException);
        });
      });

      describe('and the post is found', () => {
        it(`should return the post`, async () => {
          jest.spyOn(postsService, 'findById').mockResolvedValue(postsData[0]);

          expect(
            await postByIdPipe.transform(value, argumentMetaData),
          ).toStrictEqual(postsData[0]);
        });
      });
    });
  });
});
