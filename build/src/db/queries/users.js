"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = getChats;
exports.createChat = createChat;
const index_js_1 = require("../index.js");
const schema_js_1 = require("../schema.js");
async function getChats() {
    return index_js_1.db.select().from(schema_js_1.chats);
}
async function createChat(chat) {
    const [result] = await index_js_1.db.insert(schema_js_1.chats).values(chat);
    return result;
}
