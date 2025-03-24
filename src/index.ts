/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import { RegisterRoutes } from '../build/routes';

// import routes from './app/routes';
import { ValidateError } from 'tsoa';
import { metricsMiddleware, metricsRegistry } from './metrics';
import swaggerDocs from './swaggerController';

const app = express();
const port = process.env.PORT || 3333;

// Add a metrics endpoint
app.get('/metrics', async (_: Request, res: Response) => {
  res.set('Content-Type', metricsRegistry.contentType);
  res.end(await metricsRegistry.metrics());
});

// Add metrics middleware before other routes
app.use(metricsMiddleware);

app.use(cors());
app.use(bodyParser.json());

// manual routes
// routes(app);

// tsoa routes
RegisterRoutes(app);

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.error(`Internal Server Error: ${err.message}`);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
};

app.use(errorHandler);

swaggerDocs(app, port);

export const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

export { app };
