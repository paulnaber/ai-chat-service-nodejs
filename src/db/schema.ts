import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id').notNull(),
  title: varchar('title').notNull().default('Untitled Chat'),
  lastActiveDate: timestamp('last_active_date')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id').notNull(),
  content: varchar('content').notNull(),
  senderType: varchar('sender_type').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  chatId: uuid('chat_id')
    .references(() => chats.id, { onDelete: 'cascade' })
    .notNull(),
});
