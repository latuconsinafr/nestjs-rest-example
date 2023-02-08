import { FileGeneralAccess } from '../../services/storages/enums/file-general-access.enum';
import { LocalFile } from '../../services/storages/entities/local-file.entity';

/**
 * Dummy data for {@link LocalFile} entity.
 */
export const localFilesData: LocalFile[] = [
  new LocalFile({
    id: 1,
    fileName: 'avatar.png',
    path: 'src/database/data/media/users/profiles/avatars/a36ed5b784054001a0cf4b6772cd4f29',
    mimeType: 'image/png',
    generalAccess: FileGeneralAccess.Public,
    ownerId: 1,
  }),
  new LocalFile({
    id: 2,
    fileName: 'avatar.png',
    path: 'src/database/data/media/users/profiles/avatars/b36ed5b784054001a0cf4b6772cd4f28',
    mimeType: 'image/png',
    generalAccess: FileGeneralAccess.Public,
    ownerId: 2,
  }),
];
