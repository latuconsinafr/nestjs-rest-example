import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

/**
 * Defines the DTO that carries data to create a user.
 *
 * @usageNotes
 * The CreateUserDto contains user attribute:
 * - `username`: The username of user
 * - `password`: The password of user
 * - `description`: The description of user
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
