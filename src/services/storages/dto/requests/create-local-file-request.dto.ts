import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { FileGeneralAccess } from '../../enums/file-general-access.enum';
import { LocalFile } from '../../entities/local-file.entity';

/**
 * Defines the DTO that carries data to upload a file.
 *
 * @usageNotes
 * The CreateLocalFileRequest contains file attribute:
 * - `generalAccess`: The general access of local file
 * - `ownerId`: The owner id of local file
 */
export class CreateLocalFileRequest {
  @IsNotEmpty()
  @IsEnum(FileGeneralAccess)
  generalAccess: FileGeneralAccess;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `LocalFile` entity
   */
  static toEntity(
    file: Express.Multer.File,
    request: CreateLocalFileRequest,
  ): LocalFile {
    return new LocalFile({
      fileName: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      generalAccess: request.generalAccess,
      ownerId: request.ownerId,
    });
  }
}
