"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = getChats;
exports.createChat = createChat;
const drizzle_orm_1 = require("drizzle-orm");
const index_js_1 = require("../index.js");
const schema_js_1 = require("../schema.js");
async function getChats(userId) {
    return index_js_1.db.select().from(schema_js_1.chats).where((0, drizzle_orm_1.eq)(schema_js_1.chats.userId, userId));
}
async function createChat(content, userId) {
    const [result] = await index_js_1.db
        .insert(schema_js_1.chats)
        .values({ userId, title: content })
        .returning();
    return result;
}
