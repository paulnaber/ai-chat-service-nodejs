import { Request as ExRequest, Response as ExResponse, Express } from 'express';
// import yaml from 'js-yaml';
// import YAML from 'yaml'
import swaggerUi from 'swagger-ui-express';
import { Controller, Get, Middlewares, Produces, Route, Tags } from 'tsoa';
import { requestLoggerMiddleware } from './logger';

// Route to download OpenAPI definition as JSON
@Route('openapi')
@Produces('application/json')
export class OpenApiController extends Controller {
  /**
   * Get OpenAPI definition
   */
  @Get()
  @Tags('Openapi')
  @Middlewares(requestLoggerMiddleware())
  public async getOpenapi(): Promise<any> {
    this.setHeader('Content-Type', 'application/json');
    const jsonObj = JSON.parse(
      JSON.stringify(await import('../build/swagger.json'))
    );

    // wait for 2 seconds to test
    // (function sleepSync(milliseconds: number) {
    //   const start = Date.now();
    //   while (Date.now() - start < milliseconds);
    // })(2000);

    // TODO
    // console.warn('jsonObj', jsonObj);
    // console.warn('yaml.dump', yaml.dump(jsonObj));
    // console.warn('jmlObj', YAML.stringify(jsonObj));
    // return yaml.dump(await import('../tsoa-build/swagger.json')).toString();
    return jsonObj;
  }
}

function swaggerDocs(app: Express, port: number | string) {
  console.log(`Swagger UI available at http://localhost:${port}/swagger-ui`);

  app.use(
    '/swagger-ui',
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse, next: Function) => {
      return res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json'))
      );
      return next();
    }
  );
}
export default swaggerDocs;
