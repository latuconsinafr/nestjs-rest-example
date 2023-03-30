import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { FileGeneralAccess } from '../enums/file-general-access.enum';
import { User } from '../../users/entities/user.entity';
import { GenericEntity } from '../../../common/entities/generic.entity';

/**
 * Defines the local file entity.
 *
 * @usageNotes
 * The local file entity contains attribute:
 * - `id`: The id of local file
 * - `fileName`: The original file name of local file
 * - `path`: The path location of local file
 * - `mimeType`: The mime type of local file
 * - `generalAccess`: The general access of local file
 * - `createdAt`: The creation time of local file
 * - `updatedAt`: The last updation time of local file
 * - `uploaderId`: The id of uploader (user) of local file
 * - `uploader`: The local file uploader (user)
 */
@Entity()
export class LocalFile extends GenericEntity<LocalFile> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column()
  mimeType: string;

  @Column('enum', { enum: FileGeneralAccess })
  generalAccess: FileGeneralAccess;

  @Column('uuid')
  uploaderId: string;

  @ManyToOne(/* istanbul ignore next */ () => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  uploader: User;
}
