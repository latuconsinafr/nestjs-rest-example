import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

/**
 * Defines the DTO that carries data to create a user.
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 10)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  description?: string;
}
