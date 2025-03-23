/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as path from 'path';
import { RegisterRoutes } from '../build/routes';

// import routes from './app/routes';
import swaggerDocs from './swaggerController';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// manual routes
// routes(app);

// tsoa routes
RegisterRoutes(app);

// app.use(function errorHandler(
//   err: unknown,
//   req: ExRequest,
//   res: ExResponse,
//   next: NextFunction
// ): ExResponse | void {
//   if (err instanceof ValidateError) {
//     console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
//     return res.status(422).json({
//       message: 'Validation Failed',
//       details: err?.fields,
//     });
//   }
//   if (err instanceof Error) {
//     console.warn('err in errorHandler', err);
//     return res.status((err as any)?.status || 500).json({
//       message: err.message || 'Internal Server Error',
//     });
//   }

//   next();
// });

swaggerDocs(app, port);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
