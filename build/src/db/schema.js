"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.chats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.chats = (0, pg_core_1.pgTable)('chats', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.varchar)('user_id').notNull(),
    title: (0, pg_core_1.varchar)('title').notNull().default('Untitled Chat'),
    lastActiveDate: (0, pg_core_1.timestamp)('last_active_date')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});
exports.messages = (0, pg_core_1.pgTable)('messages', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.varchar)('user_id').notNull(),
    content: (0, pg_core_1.varchar)('content').notNull(),
    senderType: (0, pg_core_1.varchar)('sender_type').notNull().default('user'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    chatId: (0, pg_core_1.uuid)('chat_id')
        .references(() => exports.chats.id, { onDelete: 'cascade' })
        .notNull(),
});
