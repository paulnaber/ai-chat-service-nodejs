import { ErrorRequestHandler } from 'express';
import { ValidateError } from 'tsoa';
import { logger } from './logger';

export interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotAuthenticatedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserForbiddenError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof ValidateError) {
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
    logger.error(
      `Caught Validation Error for: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  } else if (err instanceof UserNotAuthenticatedError) {
    res.status(403).json({
      message: 'Authentication Failed',
      details: err,
    });
    logger.error(
      `Caught Authentication Error for: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  } else if (err instanceof Error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
    logger.error(
      `Internal Server Error: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  }

  next();
};
