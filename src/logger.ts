import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

type LoggerConfig = {
  body: string;
  //   type?: 'duration';
};

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info', // Set log level via env
  transport: {
    target: 'pino-pretty', // Makes logs readable in development
    options: { colorize: true },
  },
});

export const requestLoggerMiddleware = (config?: LoggerConfig) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(
        `${config?.body} ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
      );
    });
    next();
  };
};
