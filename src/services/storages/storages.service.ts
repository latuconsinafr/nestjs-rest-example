import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { LocalFile } from './entities/local-file.entity';

// * Service will be responsible for data storage and retrieval
/**
 * Defines the storages service that responsible for data storage and retrieval for user entity.
 */
@Injectable()
export class StoragesService {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   */
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(LocalFile)
    private readonly localFilesRepository: Repository<LocalFile>,
  ) {
    this.logger.setContext(StoragesService.name);
  }

  /**
   * Creates a local file.
   *
   * @param file A local file to create
   *
   * @returns The created local file.
   */
  async createLocalFile(file: LocalFile): Promise<LocalFile> {
    this.logger.info(
      `Try to call ${StoragesService.prototype.createLocalFile.name}`,
    );

    const createdFile: LocalFile = this.localFilesRepository.create({
      ...file,
    });

    await this.localFilesRepository.save(createdFile);

    return createdFile;
  }

  /**
   * Gets a local file by a given id.
   *
   * @param id The id to find
   *
   * @returns The local file if it exists, otherwise null.
   */
  async findLocalFileById(id: number): Promise<LocalFile | null> {
    this.logger.info(
      `Try to call ${StoragesService.prototype.findLocalFileById.name}`,
    );

    return await this.localFilesRepository.findOne({ where: { id: id } });
  }

  /**
   * Updates a local file by a given id.
   *
   * @param id The id to find
   * @param file The local file to update
   *
   * @returns The flag indicates whether the update process is success or not.
   * Return `true` if the update process is success, otherwise `false`.
   */
  async updateLocalFile(id: number, file: LocalFile): Promise<boolean> {
    this.logger.info(
      `Try to call ${StoragesService.prototype.updateLocalFile.name}`,
    );

    await this.localFilesRepository.update(id, { ...file });

    return true;
  }

  /**
   * Deletes a local file by a given id.
   *
   * @param id The id to find
   *
   * @returns The flag indicates whether the delete process is success or not.
   * Return `true` if the delete process is success, otherwise `false`.
   */
  async deleteLocalFile(id: number): Promise<boolean> {
    this.logger.info(
      `Try to call ${StoragesService.prototype.deleteLocalFile.name}`,
    );

    await this.localFilesRepository.delete(id);

    return true;
  }
}
