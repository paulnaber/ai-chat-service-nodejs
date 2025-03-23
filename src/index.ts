/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import { RegisterRoutes } from '../build/routes';

// import routes from './app/routes';
import { ValidateError } from 'tsoa';
import swaggerDocs from './swaggerController';

const app = express();
const port = process.env.PORT || 3333;

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

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
