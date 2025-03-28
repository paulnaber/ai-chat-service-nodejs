import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { RegisterRoutes } from '../build/routes';

// import routes from './app/routes';
import { errorHandler } from './errors';
import { logger, requestLoggerMiddleware } from './logger';
import { metricsMiddleware } from './metrics';
import swaggerDocs from './swaggerController';

const app = express();
const port = process.env.PORT || 3333;

// Add a metrics endpoint
// app.get('/metrics', async (_: Request, res: Response) => {
//   res.set('Content-Type', metricsRegistry.contentType);
//   res.end(await metricsRegistry.metrics());
// });

// Add metrics middleware before other routes
app.use(metricsMiddleware);
app.use(requestLoggerMiddleware());

app.use(cors());
app.use(bodyParser.json());

// manual routes
// routes(app);

// tsoa routes
RegisterRoutes(app);

app.use(errorHandler);

swaggerDocs(app, port);

export const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

export { app };
