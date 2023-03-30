import { Request, Response, NextFunction } from 'express';

/**
 * Embed a XSRF token into the local cookies.
 *
 * @usageNotes
 * Consider using the simpler functional middleware alternative any time the middleware doesn't need any dependencies.
 *
 * @see [Middleware](https://docs.nestjs.com/middleware)
 *
 * @param req The incoming request
 * @param res The response to serve
 * @param next The next function after this method in middleware order
 */
export function csurfMiddleware(
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
// export class CSURFMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: NextFunction) {
//     const token = req.csrfToken();

//     res.cookie('XSRF-TOKEN', token);
//     res.locals.csrfToken = token;

//     next();
//   }
// }
