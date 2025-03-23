"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chats = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.chats = (0, pg_core_1.pgTable)('chats', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)('title').notNull().default('Untitled Chat'),
    lastActiveDate: (0, pg_core_1.timestamp)('last_active_date')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});
