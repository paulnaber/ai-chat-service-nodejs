import { db } from '../index.js';
import { chats, NewChat } from '../schema.js';

export async function getChats() {
  return db.select().from(chats);
}

export async function createChat(chat: NewChat) {
  const [result] = await db.insert(chats).values(chat);
  return result;
}
