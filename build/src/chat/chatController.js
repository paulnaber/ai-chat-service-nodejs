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
exports.ChatsController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const chat_service_1 = require("./chat.service");
let ChatsController = class ChatsController extends tsoa_1.Controller {
    /**
     * Returns an array of chats owned by the user. User identity (email) is extracted from JWT token.
     * @summary Get all chats for a user
     */
    async getChats() {
        return chat_service_1.ChatService.getAll();
    }
    /**
     * Creates a new chat with the initial message content. User identity (email) is extracted from JWT token.
     * @summary Create a new chat
     */
    async createChat(body) {
        return chat_service_1.ChatService.create(body);
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.Security)('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
    ,
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Tags)('Chats')
], ChatsController.prototype, "getChats", null);
__decorate([
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.Security)('BearerAuth'),
    (0, tsoa_1.Post)(),
    (0, tsoa_1.Tags)('Chats'),
    __param(0, (0, tsoa_1.Body)())
], ChatsController.prototype, "createChat", null);
exports.ChatsController = ChatsController = __decorate([
    (0, tsoa_1.Route)('v1/chats')
], ChatsController);
