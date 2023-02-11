import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class UserProfileResponse {
  @ApiProperty({
    description: 'The first name of user profile',
    example: 'first',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of user profile',
    example: 'last',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'The bio of user profile',
    example: 'This is a bio',
  })
  bio?: string | null | undefined;

  @ApiPropertyOptional({
    description: 'The location of user profile',
    example: 'earth',
  })
  location?: string | null | undefined;

  @ApiPropertyOptional({
    description: 'The website of user profile',
    example: 'latuconsinafr.id',
  })
  website?: string | null | undefined;

  @ApiProperty({
    description: 'The birth date of user profile',
    example: '1995-08-06',
  })
  birthDate: Date;
}
