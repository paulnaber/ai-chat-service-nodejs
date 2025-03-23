import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull().default('Untitled Chat'),
  lastActiveDate: timestamp('last_active_date')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// TODO figure out how this works with tsos
// until then we have to create the type manually
export type _NewChat = typeof chats.$inferInsert;

export type NewChat = {
  id?: string | undefined;
  title?: string | undefined;
  lastActiveDate?: Date | undefined;
};

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: varchar('content').notNull(),
  senderType: varchar('sender_type').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  chatId: uuid('chat_id')
    .references(() => chats.id, { onDelete: 'cascade' })
    .notNull(),
});

// TODO figure out how this works with tsos
// until then we have to create the type manually
export type _NewMessage = typeof messages.$inferInsert;

export type NewMessage = {
  content: string;
  chatId: string;
  id?: string | undefined;
  senderType?: string | undefined;
  createdAt?: Date | undefined;
};
