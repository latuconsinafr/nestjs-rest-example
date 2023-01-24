import { FileGeneralAccess } from '../../common/enums/file-general-access.enum';
import { LocalFile } from '../../services/storages/entities/local-file.entity';
import { usersData } from './users.data';

/**
 * Dummy data for {@link LocalFile} entity.
 */
export const localFilesData: LocalFile[] = [
  new LocalFile({
    id: 1,
    fileName: 'avatar.jpg',
    path: '/users/profiles/avatars',
    mimeType: 'image/jpeg',
    generalAccess: FileGeneralAccess.Public,
    ownerId: usersData[0].id,
  }),
];
