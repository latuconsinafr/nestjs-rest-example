import { User } from '../../users/entities/user.entity';

/**
 * Defines the request with authenticated user interface.
 */
export default interface RequestWithUser extends Request {
  user: User;
}
