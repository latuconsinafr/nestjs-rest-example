import RequestWithAuthUser from '../../../services/auth/interface/request-with-auth-user.interface';
import { UserRole } from '../../../services/users/enums/user-role.enum';
import { caslConfig } from '../../auth/casl.config';

describe(`when ${caslConfig.name} is registered`, () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the correct config', () => {
    expect(JSON.stringify(caslConfig())).toEqual(
      JSON.stringify({
        superuserRole: UserRole.SuperAdmin,
        getUserFromRequest(request: RequestWithAuthUser) {
          const user = request.user;

          if (user) {
            user.roles = user.roles.map((role: any) => role?.name);
          }

          return user;
        },
      }),
    );
  });
});
