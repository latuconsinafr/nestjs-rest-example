import { LocalFile } from '../../services/storages/entities/local-file.entity';
import { FileGeneralAccess } from '../../services/storages/enums/file-general-access.enum';

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
];
