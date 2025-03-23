import { eq } from 'drizzle-orm';
import { db } from '../index.js';
import { messages, NewMessage } from '../schema';

export async function getMessages(chatId: string) {
  return db.select().from(messages).where(eq(messages.chatId, chatId));
}

export async function createMessage(message: NewMessage) {
  const [result] = await db.insert(messages).values(message);
  return result;
}
