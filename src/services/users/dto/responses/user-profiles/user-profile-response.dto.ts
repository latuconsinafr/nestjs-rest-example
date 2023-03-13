import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { TimestampResponse } from '../../../../../common/dto/responses/timestamp-response.dto';
import { localFilesData } from '../../../../../database/data/local-files.data';
import { userProfilesData } from '../../../../../database/data/user-profiles.data';
import { UserIdParam } from '../../params/users/user-id.param';

/**
 * Defines the DTO that carries data representing a user profile.
 *
 * @usageNotes
 * The DTO intersect {@link UserIdParam} with {@link TimestampResponse}.
 *
 * The UserProfileResponse also contains user profile attribute:
 * - `firstName`: The first name of user profile
 * - `lastName`: The last name of user profile
 * - `bio`: The bio of user profile
 * - `location`: The location of user profile
 * - `website`: The website of user profile
 * - `birthDate`: The birthDate of user profile
 * - `avatarFileId`: The avatar file id of user profile
 */
export class UserProfileResponse extends IntersectionType(
  UserIdParam,
  TimestampResponse,
) {
  @ApiProperty({
    description: 'The first name of user profile',
    example: userProfilesData[0].firstName,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of user profile',
    example: userProfilesData[0].lastName,
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'The bio of user profile',
    example: userProfilesData[0].bio,
  })
  bio?: string | null | undefined;

  @ApiPropertyOptional({
    description: 'The location of user profile',
    example: userProfilesData[0].location,
  })
  location?: string | null | undefined;

  @ApiPropertyOptional({
    description: 'The website of user profile',
    example: userProfilesData[0].website,
  })
  website?: string | null | undefined;

  @ApiProperty({
    description: 'The birth date of user profile',
    example: userProfilesData[0].birthDate,
  })
  birthDate: Date;

  @ApiPropertyOptional({
    description: 'The avatar file id of user profile',
    example: localFilesData[0].id,
  })
  avatarFileId?: string | undefined;
}
