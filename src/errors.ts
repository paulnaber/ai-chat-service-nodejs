import { ErrorRequestHandler } from 'express';
import { ValidateError } from 'tsoa';
import { logger } from './logger';

export const ERROR_422 = 'Validation Failed';
export const ERROR_401 = 'Authentication Failed';
export const ERROR_500 = 'Internal Server Error';

export interface ErrorDTO {
  message: string;
  err: {
    name: string;
    message: string;
    stack: string;
  };
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
    res.status(422).json(getErrorResponse(ERROR_422, err));
    logger.error(
      `Caught Validation Error for: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  } else if (err instanceof UserNotAuthenticatedError) {
    res.status(401).json(getErrorResponse(ERROR_401, err));
    logger.error(
      `Caught Authentication Error for: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  } else if (err instanceof Error) {
    res.status(500).json(getErrorResponse(ERROR_500, err));
    logger.error(
      `Internal Server Error: ${req.method} ${req.url} ${res.statusCode} ${err}`
    );
    return;
  }

  next();
};

function getErrorResponse(message: string, err: Error) {
  return {
    message,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack, // TODO maybe hide?
    },
  };
}
