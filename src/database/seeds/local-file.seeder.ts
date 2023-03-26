import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { LocalFile } from '../../services/storages/entities/local-file.entity';
import { localFilesData } from '../data/local-files.data';

/**
 * Defines {@link LocalFile} entity seeder.
 */
export default class LocalFileSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(LocalFile)
      .values([...localFilesData])
      .orIgnore()
      .execute();
  }
}
