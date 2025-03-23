"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const users_1 = require("../db/queries/users");
class ChatService {
    static async getAll() {
        return await (0, users_1.getChats)();
    }
}
exports.ChatService = ChatService;
