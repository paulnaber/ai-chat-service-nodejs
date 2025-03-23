"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = getMessages;
exports.createMessage = createMessage;
const drizzle_orm_1 = require("drizzle-orm");
const index_js_1 = require("../index.js");
const schema_1 = require("../schema");
async function getMessages(chatId) {
    return index_js_1.db.select().from(schema_1.messages).where((0, drizzle_orm_1.eq)(schema_1.messages.chatId, chatId));
}
async function createMessage(message) {
    const [result] = await index_js_1.db.insert(schema_1.messages).values(message);
    return result;
}
