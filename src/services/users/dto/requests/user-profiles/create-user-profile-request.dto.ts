import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserProfile } from '../../../entities/user-profile.entity';

/**
 * Defines the DTO that carries data to create a user profile.
 *
 * @usageNotes
 * The CreateUserProfileRequest contains user profile attribute:
 * - `firstName`: The first name of user profile
 * - `lastName`: The last name of user profile
 * - `bio`: The bio of user profile
 * - `location`: The location of user profile
 * - `website`: The website of user profile
 * - `birthDate`: The birthDate of user profile
 */
export class CreateUserProfileRequest {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  bio?: string | null | undefined;

  @IsOptional()
  @IsString()
  location?: string | null | undefined;

  @IsOptional()
  @IsString()
  website?: string | null | undefined;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  birthDate: Date;

  /**
   * Transform the DTO into the related entity.
   *
   * @param request The request DTO to transform
   *
   * @returns The `UserProfile` entity
   */
  static toEntity(request: CreateUserProfileRequest): UserProfile {
    return new UserProfile(request);
  }
}
