// import yaml from 'js-yaml';
// import YAML from 'yaml'
import { Controller, Get, Produces, Route, Tags } from 'tsoa';
import { metricsRegistry } from './metrics';

// Route to download OpenAPI definition as JSON
@Route('metrics')
@Produces('application/json')
export class MetricsController extends Controller {
  /**
   * Get OpenAPI definition
   */
  @Get()
  @Tags('Metrics')
  public async getMetrics(): Promise<any> {
    return await metricsRegistry.metrics();
  }
}
