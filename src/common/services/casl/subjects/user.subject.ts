import { User } from '../../../../services/users/entities/user.entity';
import { UserIdParam } from '../../../../services/users/dto/params/users/user-id.param';
import { CreateUserRequest } from '../../../../services/users/dto/requests/users/create-user-request.dto';
import { UpdateUserRequest } from '../../../../services/users/dto/requests/users/update-user-request.dto';
import { UpdateUserProfileRequest } from '../../../../services/users/dto/requests/user-profiles/update-user-profile-request.dto';

export type UserSubject =
  | typeof User
  | typeof UserIdParam
  | typeof CreateUserRequest
  | typeof UpdateUserRequest
  | typeof UpdateUserProfileRequest;
export const UserSubject =
  User ||
  UserIdParam ||
  CreateUserRequest ||
  UpdateUserRequest ||
  UpdateUserProfileRequest;
