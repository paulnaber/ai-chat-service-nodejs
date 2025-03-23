import { eq } from 'drizzle-orm';
import { MessageDTO } from '../../message/message.models';
import { db } from '../index';
import { messages } from '../schema';

export async function getMessages(chatId: string) {
  return db.select().from(messages).where(eq(messages.chatId, chatId));
}

export async function createMessage(message: MessageDTO) {
  const [result] = await db.insert(messages).values(message);
  return result;
}
