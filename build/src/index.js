"use strict";
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const routes_1 = require("../build/routes");
// import routes from './app/routes';
const swaggerController_1 = __importDefault(require("./swaggerController"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
// manual routes
// routes(app);
// tsoa routes
(0, routes_1.RegisterRoutes)(app);
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
(0, swaggerController_1.default)(app, port);
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
