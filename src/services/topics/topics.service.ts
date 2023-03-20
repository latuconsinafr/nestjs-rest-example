import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { In, Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the topics service that responsible for data storage and retrieval for topic related entity.
 */
@Injectable()
export class TopicsService {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param topicsRepository The repository of topic entity
   */
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
  ) {
    this.logger.setContext(TopicsService.name);
  }

  /**
   * Creates a topic.
   *
   * @param topic A topic to create
   *
   * @returns The created topic.
   */
  async create(topic: Topic): Promise<Topic> {
    this.logger.info(`Try to call ${TopicsService.prototype.create.name}`);

    const createdTopic = this.topicsRepository.create(topic);

    await this.topicsRepository.save(createdTopic);

    return createdTopic;
  }

  /**
   * Gets all topics.
   *
   * @returns The topics array.
   */
  async findAll(): Promise<Topic[]> {
    this.logger.info(`Try to call ${TopicsService.prototype.findAll.name}`);

    return await this.topicsRepository.find();
  }

  /**
   * Get topics by a given ids.
   *
   * @param ids The ids to find
   *
   * @returns The topics array.
   */
  async findByIds(ids: string[]): Promise<Topic[]> {
    this.logger.info(`Try to call ${TopicsService.prototype.findByIds.name}`);

    return await this.topicsRepository.find({
      where: { id: In(ids) },
    });
  }

  /**
   * Gets a topic by a given id.
   *
   * @param id The id to find
   *
   * @returns The topic if it exists, otherwise null.
   */
  async findById(id: string): Promise<Topic | null> {
    this.logger.info(`Try to call ${TopicsService.prototype.findById.name}`);

    return await this.topicsRepository.findOne({
      where: { id },
    });
  }

  /**
   * Gets a topic by a given name.
   *
   * @param name The name to find
   *
   * @returns The topic if it exists, otherwise null.
   */
  async findByName(name: string): Promise<Topic | null> {
    this.logger.info(`Try to call ${TopicsService.prototype.findByName.name}`);

    return await this.topicsRepository.findOne({
      where: { name },
    });
  }

  /**
   * Updates a topic by a given id.
   *
   * @param id The topic id to update
   * @param topic The topic to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async update(id: string, topic: Topic): Promise<boolean> {
    this.logger.info(`Try to call ${TopicsService.prototype.update.name}`);

    await this.topicsRepository.update(id, topic);

    return true;
  }

  /**
   * Deletes a topic by a given id.
   *
   * @param id The id to find
   *
   * @returns The flag indicates whether the delete process is success or not.
   * Return `true` if the delete process is success, otherwise `false`.
   */
  async delete(id: string): Promise<boolean> {
    this.logger.info(`Try to call ${TopicsService.prototype.delete.name}`);

    await this.topicsRepository.delete(id);

    return true;
  }
}
