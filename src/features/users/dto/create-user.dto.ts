import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';

/**
 * Defines the DTO that carries data to create a user.
 *
 * @usageNotes
 * The CreateUserDto contains user attribute:
 * - `username`: The username of user
 * - `password`: The password of user
 * - `roles`: The roles of user
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

  @IsNotEmpty()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsOptional()
  @IsString()
  description?: string;
}
