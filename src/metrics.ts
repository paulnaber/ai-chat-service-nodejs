// custrom metrics can be added like this

import { Counter, Histogram } from 'prom-client';

import { NextFunction, Request, Response } from 'express';
import promBundle from 'express-prom-bundle';
import { Registry, collectDefaultMetrics } from 'prom-client';

export const metricsRegistry = new Registry();

// Add prometheus middleware
export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promRegistry: metricsRegistry,
});

// Add default metrics (CPU, memory, etc.)
collectDefaultMetrics({ register: metricsRegistry });

// Request counter
const getChatshttpRequestsTotal = new Counter({
  name: 'get_chats_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [metricsRegistry],
});

// Response time histogram
const getChatsRequestDuration = new Histogram({
  name: 'get_chats_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status'],
  registers: [metricsRegistry],
});

export async function getChatsMetricMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    getChatsRequestDuration
      .labels(req.method, req.path, res.statusCode.toString())
      .observe(duration / 1000);
    getChatshttpRequestsTotal
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  });
  next();
}
