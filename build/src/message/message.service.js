"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const messages_1 = require("../db/queries/messages");
class MessageService {
    static async getAll(chatId) {
        return await (0, messages_1.getMessages)(chatId);
    }
    static async create(chatId, message, userId) {
        return await (0, messages_1.createMessage)({
            userId,
            content: message,
            chatId: chatId,
        });
    }
}
exports.MessageService = MessageService;
