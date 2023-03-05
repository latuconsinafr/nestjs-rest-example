import { registerAs } from '@nestjs/config';
import { OptionsForRoot } from 'nest-casl';
import RequestWithAuthUser from '../../services/auth/interface/request-with-auth-user.interface';
import { UserRole } from '../../services/roles/enums/user-role.enum';
import { User } from '../../services/users/entities/user.entity';

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

        // ! Need to transform the array of Role Entity to array of UserRole
        // @example
        // ```ts
        // From
        // ***
        // {
        //   ...
        //   roles: [
        //       {
        //           id: 1,
        //           name: "super-admin"
        //       }
        //   ]
        // }
        // ***
        // To
        // ***
        // {
        //   ...
        //   roles: ["super-admin"]
        // }
        // ***
        if (user) {
          user.roles = user.roles.map((role: any) => role?.name);
        }

        return user;
      },
    };
  },
);
