import { eq } from 'drizzle-orm';
import { ChatDTO } from '../../chat/chat.models.js';
import { db } from '../index.js';
import { chats } from '../schema.js';

export async function getChats(userId: string) {
  return db.select().from(chats).where(eq(chats.userId, userId));
}

export async function createChat(
  content: string,
  userId: string
): Promise<ChatDTO> {
  const [result] = await db
    .insert(chats)
    .values({ userId, title: content })
    .returning();
  return result;
}
