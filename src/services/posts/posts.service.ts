import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { Topic } from '../topics/entities/topic.entity';
import { Post } from './entities/post.entity';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the posts service that responsible for data storage and retrieval for post entity.
 */
@Injectable()
export class PostsService {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param postsRepository The repository of local file entity
   */
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {
    this.logger.setContext(PostsService.name);
  }

  /**
   * Creates a post.
   *
   * @param post A post to create
   *
   * @return The created post.
   */
  async create(post: Post): Promise<Post> {
    this.logger.info(`Try to call ${PostsService.prototype.create.name}`);

    const createdPost: Post = this.postsRepository.create(post);

    await this.postsRepository.save(createdPost);

    return createdPost;
  }

  /**
   * Gets all posts.
   *
   * @returns The posts array.
   */
  async findAll(): Promise<Post[]> {
    this.logger.info(`Try to call ${PostsService.prototype.findAll.name}`);

    return await this.postsRepository.find();
  }

  /**
   * Gets a post by a given id.
   *
   * @param id The id to find
   *
   * @returns The post if it exists, otherwise null.
   */
  async findById(id: string): Promise<Post | null> {
    this.logger.info(`Try to call ${PostsService.prototype.findById.name}`);

    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  /**
   * Updates a post by a given id.
   *
   * @param id The post id to update
   * @param post The post to update
   *
   * @returns The flag indicates whether the update process is success or not
   * Return `true` if the update process is success, otherwise `false`.
   */
  async update(id: string, post: Post): Promise<boolean> {
    this.logger.info(`Try to call ${PostsService.prototype.update.name}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { topics, topicIds, ...postToUpdate } = post;

    await this.postsRepository.update(id, postToUpdate);

    return true;
  }

  /**
   * Updates a post topics by a given id.
   *
   * @param id The post id to update
   * @param topics The post topics to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async updateTopics(id: string, topics: Topic[]): Promise<boolean> {
    this.logger.info(`Try to call ${PostsService.prototype.updateTopics.name}`);

    await this.postsRepository.save({
      ...(await this.findById(id)),
      topics: topics,
    });

    return true;
  }

  /**
   * Deletes a post by a given id.
   *
   * @param id The id to find
   *
   * @returns The flag indicated whether the delete process is success or not
   * Return `true` if the delete process is success, otherwise `false`.
   */
  async delete(id: string): Promise<boolean> {
    this.logger.info(`Try to call ${PostsService.prototype.delete.name}`);

    await this.postsRepository.delete(id);

    return true;
  }
}
