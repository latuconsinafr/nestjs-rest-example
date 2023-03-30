import { registerAs } from '@nestjs/config';
import { OptionsForRoot } from 'nest-casl';
import RequestWithAuthUser from '../../services/auth/interface/request-with-auth-user.interface';
import { User } from '../../services/users/entities/user.entity';
import { UserRole } from '../../services/users/enums/user-role.enum';

/**
 * Defines the CASL configuration using nest-casl.
 * This configuration is registered under `casl` namespace.
 *
 * @see [Configuration Namespace](https://docs.nestjs.com/techniques/configuration#configuration-namespaces)
 */
export const caslConfig = registerAs(
  'casl',
  (): OptionsForRoot<UserRole, User, RequestWithAuthUser> => {
    return {
      superuserRole: UserRole.SuperAdmin,
      /* istanbul ignore next */ getUserFromRequest(
        request: RequestWithAuthUser,
      ) {
        const user = request.user;

        return user;
      },
    };
  },
);
