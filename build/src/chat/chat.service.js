"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const users_1 = require("../db/queries/users");
class ChatService {
    static async getAll(userId) {
        return await (0, users_1.getChats)(userId);
    }
    static async create(content, userId) {
        console.warn('create', content, userId);
        return await (0, users_1.createChat)(content, userId);
    }
}
exports.ChatService = ChatService;
