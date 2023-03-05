import { csurfMiddleware } from '../../middlewares/csurf.middleware';

describe(`when ${csurfMiddleware.name} is called`, () => {
  const request: any = {
    csrfToken: jest.fn(),
  };
  const response: any = {
    cookie: jest.fn(),
    locals: jest.fn().mockReturnThis(),
    csrfToken: jest.fn(),
  };
  const next: any = jest.fn();
  const token = 'token';

  beforeEach(() => {
    request.csrfToken.mockReturnValue(token);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set cookie with token', () => {
    csurfMiddleware(request, response, next);

    expect(response.cookie).toBeCalledWith('XSRF-TOKEN', 'token');
  });

  it('should set the locals csrf token with token', () => {
    csurfMiddleware(request, response, next);

    expect(response.locals.csrfToken).toBe(token);
  });

  it('should call the next method', () => {
    csurfMiddleware(request, response, next);

    expect(next).toBeCalledTimes(1);
  });
});
