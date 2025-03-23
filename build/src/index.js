"use strict";
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("../build/routes");
// import routes from './app/routes';
const tsoa_1 = require("tsoa");
const swaggerController_1 = __importDefault(require("./swaggerController"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// manual routes
// routes(app);
// tsoa routes
(0, routes_1.RegisterRoutes)(app);
const errorHandler = (err, req, res, next) => {
    if (err instanceof tsoa_1.ValidateError) {
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
(0, swaggerController_1.default)(app, port);
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
