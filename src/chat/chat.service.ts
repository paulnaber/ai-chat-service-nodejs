import { createChat, getChats } from '../db/queries/users';
import { NewChat } from '../db/schema';

export class ChatService {
  static async getAll(userId: string): Promise<NewChat[]> {
    return await getChats(userId);
  }

  static async create(content: string, userId: string): Promise<NewChat> {
    console.warn('create', content, userId);
    return await createChat(content, userId);
  }
}
