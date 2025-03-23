"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiController = void 0;
// import yaml from 'js-yaml';
// import YAML from 'yaml'
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
// Route to download OpenAPI definition as JSON
let OpenApiController = class OpenApiController extends tsoa_1.Controller {
    /**
     * Get OpenAPI definition
     */
    async getOpenapi() {
        this.setHeader('Content-Type', 'application/json');
        const jsonObj = JSON.parse(JSON.stringify(await Promise.resolve().then(() => __importStar(require('../build/swagger.json')))));
        // TODO
        // console.warn('jsonObj', jsonObj);
        // console.warn('yaml.dump', yaml.dump(jsonObj));
        // console.warn('jmlObj', YAML.stringify(jsonObj));
        // return yaml.dump(await import('../tsoa-build/swagger.json')).toString();
        return jsonObj;
    }
};
exports.OpenApiController = OpenApiController;
__decorate([
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Tags)('Openapi')
], OpenApiController.prototype, "getOpenapi", null);
exports.OpenApiController = OpenApiController = __decorate([
    (0, tsoa_1.Route)('openapi'),
    (0, tsoa_1.Produces)('application/json')
], OpenApiController);
function swaggerDocs(app, port) {
    console.log(`Swagger UI available at http://localhost:${port}/swagger-ui`);
    app.use('/swagger-ui', swagger_ui_express_1.default.serve, async (_req, res, next) => {
        return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require('../build/swagger.json')))));
        return next();
    });
}
exports.default = swaggerDocs;
