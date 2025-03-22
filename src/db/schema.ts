import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull().default('Untitled Chat'),
  lastActiveDate: timestamp('last_active_date')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// export type NewChat = typeof chats.$inferInsert;

export type NewChat = {
  id?: string | undefined;
  title?: string | undefined;
  lastActiveDate?: Date | undefined;
};
