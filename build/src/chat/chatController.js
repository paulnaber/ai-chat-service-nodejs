"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsController = void 0;
// src/users/usersController.ts
const tsoa_1 = require("tsoa");
const chat_service_1 = require("./chat.service");
// interface ValidateErrorJSON {
//   message: 'Validation failed';
//   details: { [name: string]: unknown };
// }
let ChatsController = class ChatsController extends tsoa_1.Controller {
    /**
     * Get all Players
     */
    // @Security('BearerAuth', ['admin'])
    async getChats() {
        return chat_service_1.ChatService.getAll();
    }
};
exports.ChatsController = ChatsController;
__decorate([
    (0, tsoa_1.Security)('BearerAuth'),
    (0, tsoa_1.Get)(),
    (0, tsoa_1.Tags)('Chats')
], ChatsController.prototype, "getChats", null);
exports.ChatsController = ChatsController = __decorate([
    (0, tsoa_1.Route)('v1/chats')
], ChatsController);
