import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { chats, NewChat } from '../schema.js';

export async function getChats(userId: string) {
  return db.select().from(chats).where(eq(chats.userId, userId));
}

export async function createChat(
  content: string,
  userId: string
): Promise<NewChat> {
  const [result] = await db
    .insert(chats)
    .values({ userId, title: content })
    .returning();
  return result;
}
