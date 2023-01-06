import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FileGeneralAccess } from '../../../common/enums/file-general-access.enum';
import { User } from '../../users/entities/user.entity';

/**
 * Defines the local file entity.
 *
 * @usageNotes
 * The Local File Entity contains attribute:
 * - `id`: The id of local file
 * - `fileName`: The original file name of local file
 * - `path`: The path location of local file
 * - `mimeType`: The mime type of local file
 * - `generalAccess`: The general access of local file
 * - `ownerId`: The id of owner of local file
 */
@Entity()
export class LocalFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column()
  mimeType: string;

  @Column('enum', { enum: FileGeneralAccess })
  generalAccess: FileGeneralAccess;

  @Column({ nullable: true })
  ownerId?: number | null | undefined;

  @ManyToOne(/* istanbul ignore next */ () => User)
  @JoinColumn()
  owner?: User | null | undefined;

  /**
   * The constructor.
   *
   * @param partial The partial object of Local File
   */
  constructor(partial: Partial<LocalFile>) {
    Object.assign(this, partial);
  }
}
