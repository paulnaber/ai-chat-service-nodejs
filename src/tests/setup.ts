import { db } from '../db';

beforeAll(async () => {
  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS chats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id VARCHAR NOT NULL,
      title VARCHAR NOT NULL DEFAULT 'Untitled Chat',
      last_active_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id VARCHAR NOT NULL,
      content VARCHAR NOT NULL,
      sender_type VARCHAR NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE
    );
  `);
});

afterAll(async () => {
  // Drop tables
  await db.execute(`
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS chats;
  `);
});

beforeEach(async () => {
  // Clear data
  await db.execute(`DELETE FROM messages`);
  await db.execute(`DELETE FROM chats`);
});
