import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The first name of user profile',
    example: 'first',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The last name of user profile',
    example: 'last',
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  @ApiPropertyOptional({
    description: 'The bio of user profile',
    example: 'This is a bio',
  })
  bio?: string | null | undefined;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The location of user profile',
    example: 'earth',
  })
  location?: string | null | undefined;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The website of user profile',
    example: 'latuconsinafr.id',
  })
  website?: string | null | undefined;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  @ApiProperty({
    description: 'The birth date of user profile',
    example: '1995-08-06',
  })
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
