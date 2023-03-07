import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileGeneralAccess } from '../enums/file-general-access.enum';
import { User } from '../../users/entities/user.entity';

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
 * - `ownerId`: The id of owner of local file
 * - `createdAt`: The creation time of local file
 * - `updatedAt`: The last updation time of local file
 * - `owner`: The local file owner
 */
@Entity()
export class LocalFile {
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

  @Column('uuid', { nullable: true })
  ownerId?: string | undefined;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(/* istanbul ignore next */ () => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner?: User | undefined;

  /**
   * The constructor.
   *
   * @param partial The partial object of Local File
   */
  constructor(partial: Partial<LocalFile>) {
    Object.assign(this, partial);
  }
}
