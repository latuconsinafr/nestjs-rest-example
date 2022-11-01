import { Request, Response, NextFunction } from 'express';

// * Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
// * Reference: https://docs.nestjs.com/middleware
export function csrfMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.csrfToken();

  res.cookie('XSRF-TOKEN', token);
  res.locals.csrfToken = token;

  next();
}

// @Injectable()
// export class CSRFMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: NextFunction) {
//     const token = req.csrfToken();

//     res.cookie('XSRF-TOKEN', token);
//     res.locals.csrfToken = token;

//     next();
//   }
// }
