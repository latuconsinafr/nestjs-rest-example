import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Logging every http response on finish.
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
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger('loggerMiddleware');

  res.on('finish', () => {
    const { method, originalUrl } = req;
    const { statusCode, statusMessage } = res;

    const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;

    if (statusCode >= 500) {
      return logger.error(message);
    }

    if (statusCode >= 400) {
      return logger.warn(message);
    }

    return logger.log(message);
  });

  next();
}
