import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { localFilesData } from '../../../../database/data/local-files.data';
import { LocalFile } from '../../entities/local-file.entity';
import { FileGeneralAccess } from '../../enums/file-general-access.enum';

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
  @ApiProperty({
    description: 'The general access of local file',
    enum: FileGeneralAccess,
    example: localFilesData[0].generalAccess,
  })
  generalAccess: FileGeneralAccess;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The owner id of local file',
    example: localFilesData[0].ownerId,
  })
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
