import { Request as ExRequest, Response as ExResponse, Express } from 'express';
// import yaml from 'js-yaml';
// import YAML from 'yaml'
import swaggerUi from 'swagger-ui-express';
import { Controller, Get, Produces, Route, Tags } from 'tsoa';

// Route to download OpenAPI definition as JSON
@Route('openapi')
@Produces('application/json')
export class OpenApiController extends Controller {
  /**
   * Get OpenAPI definition
   */
  @Get()
  @Tags('Openapi')
  public async getOpenapi(): Promise<any> {
    this.setHeader('Content-Type', 'application/json');
    const jsonObj = JSON.parse(
      JSON.stringify(await import('../tsoa-build/swagger.json'))
    );
    // TODO
    // console.warn('jsonObj', jsonObj);
    // console.warn('yaml.dump', yaml.dump(jsonObj));
    // console.warn('jmlObj', YAML.stringify(jsonObj));
    // return yaml.dump(await import('../tsoa-build/swagger.json')).toString();
    return jsonObj;
  }
}

function swaggerDocs(app: Express, port: number) {
  console.log(`Swagger UI available at http://localhost:${port}/swagger-ui`);

  app.use(
    '/swagger-ui',
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse, next: Function) => {
      return res.send(
        swaggerUi.generateHTML(await import('../tsoa-build/swagger.json'))
      );
      return next();
    }
  );
}
export default swaggerDocs;
