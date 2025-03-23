"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const swaggerController_1 = require("./../src/swaggerController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const messageController_1 = require("./../src/message/messageController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const chatController_1 = require("./../src/chat/chatController");
const authentication_1 = require("./../src/authentication");
const expressAuthenticationRecasted = authentication_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "NewMessage": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "createdAt": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }] }, "senderType": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] }, "id": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] }, "chatId": { "dataType": "string", "required": true }, "userId": { "dataType": "string", "required": true }, "content": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NewChat": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "lastActiveDate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "undefined" }] }, "title": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] }, "userId": { "dataType": "string", "required": true }, "id": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "undefined" }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "enum", "enums": ["Validation failed"], "required": true },
            "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsOpenApiController_getOpenapi = {};
    app.get('/openapi', ...((0, runtime_1.fetchMiddlewares)(swaggerController_1.OpenApiController)), ...((0, runtime_1.fetchMiddlewares)(swaggerController_1.OpenApiController.prototype.getOpenapi)), async function OpenApiController_getOpenapi(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsOpenApiController_getOpenapi, request, response });
            const controller = new swaggerController_1.OpenApiController();
            await templateService.apiHandler({
                methodName: 'getOpenapi',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMessageController_getMessages = {
        chatId: { "in": "path", "name": "chatId", "required": true, "dataType": "string" },
    };
    app.get('/v1/chats/:chatId/messages', authenticateMiddleware([{ "BearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(messageController_1.MessageController)), ...((0, runtime_1.fetchMiddlewares)(messageController_1.MessageController.prototype.getMessages)), async function MessageController_getMessages(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMessageController_getMessages, request, response });
            const controller = new messageController_1.MessageController();
            await templateService.apiHandler({
                methodName: 'getMessages',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsMessageController_createMessage = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string", "required": true } } },
        chatId: { "in": "path", "name": "chatId", "required": true, "dataType": "string" },
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
    };
    app.post('/v1/chats/:chatId/messages', authenticateMiddleware([{ "BearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(messageController_1.MessageController)), ...((0, runtime_1.fetchMiddlewares)(messageController_1.MessageController.prototype.createMessage)), async function MessageController_createMessage(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsMessageController_createMessage, request, response });
            const controller = new messageController_1.MessageController();
            await templateService.apiHandler({
                methodName: 'createMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsChatsController_getChats = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
    };
    app.get('/v1/chats', authenticateMiddleware([{ "BearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(chatController_1.ChatsController)), ...((0, runtime_1.fetchMiddlewares)(chatController_1.ChatsController.prototype.getChats)), async function ChatsController_getChats(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsChatsController_getChats, request, response });
            const controller = new chatController_1.ChatsController();
            await templateService.apiHandler({
                methodName: 'getChats',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsChatsController_createChat = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "content": { "dataType": "string", "required": true } } },
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
    };
    app.post('/v1/chats', authenticateMiddleware([{ "BearerAuth": [] }]), ...((0, runtime_1.fetchMiddlewares)(chatController_1.ChatsController)), ...((0, runtime_1.fetchMiddlewares)(chatController_1.ChatsController.prototype.createChat)), async function ChatsController_createChat(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsChatsController_createChat, request, response });
            const controller = new chatController_1.ChatsController();
            await templateService.apiHandler({
                methodName: 'createChat',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
