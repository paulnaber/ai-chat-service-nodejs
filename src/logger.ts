import { NextFunction, Request, Response } from 'express';
import pino from 'pino';
import pinoElastic from 'pino-elasticsearch';

const streamToElastic = pinoElastic({
  index: 'an-index',
  node: 'http://localhost:9200',
  esVersion: 8, // OpenSearch 2.x is compatible with Elasticsearch 8.x API
  flushBytes: 1000,
  // Add these options for OpenSearch
  auth: undefined, // since security is disabled
});

export const logger = pino(
  {
    level: 'debug', // TODO set via env
    transport: {
      target: 'pino-pretty', // Makes logs readable in development
      options: { colorize: true },
    },
  },
  streamToElastic
);

export const requestLoggerMiddleware = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });
    next();
  };
};
