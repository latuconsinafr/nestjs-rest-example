import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { UserRole } from '../../enums/user-role.enum';
import { mockedGetRequest } from '../../utils/mocks/arguments-host.mock';
import { mockedExecutionContext } from '../../utils/mocks/execution-context.mock';
import { mockedReflector } from '../../utils/mocks/reflector.mock';
import { RolesGuard } from '../../guards/roles.guard';

describe('RolesGuard', () => {
  const executionContext = mockedExecutionContext as any;

  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockedReflector,
        },
      ],
    }).compile();

    rolesGuard = moduleRef.get<RolesGuard>(RolesGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when canActivate is called', () => {
    let reflectorGetSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      reflectorGetSpy = jest.spyOn(reflector, 'get');
    });

    describe('and Roles decorator is not set', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue([]);
      });

      it('should skip (return true)', () => {
        expect(rolesGuard.canActivate(executionContext)).toBeTruthy();
      });
    });

    describe('and Roles decorator is set with matching roles', () => {
      beforeEach(() => {
        reflectorGetSpy.mockReturnValue([UserRole.SuperAdmin]);
      });

      describe('and there is no user in the request', () => {
        it('should return false', () => {
          mockedGetRequest.mockReturnValue({
            user: undefined,
          });

          expect(rolesGuard.canActivate(executionContext)).toBeFalsy();
        });
      });

      describe('and the user has role that is allowed', () => {
        it('should return true', () => {
          mockedGetRequest.mockReturnValue({
            user: { roles: [UserRole.SuperAdmin] },
          });

          expect(rolesGuard.canActivate(executionContext)).toBeTruthy();
        });
      });

      describe('and the user has role that is not allowed', () => {
        it('should return false', () => {
          mockedGetRequest.mockReturnValue({
            user: { roles: [UserRole.User] },
          });

          expect(rolesGuard.canActivate(executionContext)).toBeFalsy();
        });
      });
    });
  });
});
