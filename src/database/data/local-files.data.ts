import { FileGeneralAccess } from '../../services/storages/enums/file-general-access.enum';
import { LocalFile } from '../../services/storages/entities/local-file.entity';
import { usersData } from './users.data';

/**
 * Dummy data for {@link LocalFile} entity.
 */
export const localFilesData = [
  new LocalFile({
    id: '3ba92036-75c8-4881-a7cf-410b70150e69',
    fileName: 'avatar.png',
    path: 'src/database/data/media/users/profiles/avatars/a36ed5b784054001a0cf4b6772cd4f29',
    mimeType: 'image/png',
    generalAccess: FileGeneralAccess.Public,
    uploaderId: usersData[0].id,
  }),
  new LocalFile({
    id: '96c9e630-50ac-41cc-9498-3bf3b8a504f8',
    fileName: 'avatar.png',
    path: 'src/database/data/media/users/profiles/avatars/b36ed5b784054001a0cf4b6772cd4f28',
    mimeType: 'image/png',
    generalAccess: FileGeneralAccess.Public,
    uploaderId: usersData[1].id,
  }),
] as const; // * Make it tuple to allow checked indexes {@see https://www.youtube.com/watch?v=nNse0r0aRT8&t=957s}
