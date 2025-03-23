"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const message_service_1 = require("./message.service");
let MessageController = class MessageController extends tsoa_1.Controller {
    /**
     * Returns an array of messages for the specified chat. User identity (email) is extracted from JWT token.
     * @summary Get all messages for a chat
     */
    async getMessages(chatId) {
        return message_service_1.MessageService.getAll(chatId);
    }
    /**
     * Creates a new message in a specific chat. User identity (email) is extracted from JWT token.
     * @summary Create a new message
     */
    async createMessage(body, chatId, request) {
        // TODO why is there no email in request.user?
        // this also needs to be checked first
        console.warn('userId from token ---->', request.user.preferred_username);
        return message_service_1.MessageService.create(chatId, body.content, request.user.preferred_username);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, tsoa_1.Security)('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
    ,
    (0, tsoa_1.Get)('{chatId}/messages'),
    (0, tsoa_1.Tags)('Messages'),
    __param(0, (0, tsoa_1.Path)())
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, tsoa_1.Security)('BearerAuth'),
    (0, tsoa_1.Post)('{chatId}/messages'),
    (0, tsoa_1.Tags)('Messages'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Request)())
], MessageController.prototype, "createMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, tsoa_1.Route)('v1/chats')
], MessageController);
