import { createChat, getChats } from '../db/queries/users';
import { NewChat } from '../db/schema';

export class ChatService {
  static async getAll(): Promise<NewChat[]> {
    return await getChats();
  }

  static async create(chat: NewChat): Promise<NewChat> {
    return await createChat(chat);
  }
}
