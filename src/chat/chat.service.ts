import { createChat, getChats } from '../db/queries/users';
import { ChatDTO } from './chat.models';

export class ChatService {
  static async getAll(userId: string): Promise<ChatDTO[]> {
    return await getChats(userId);
  }

  static async create(content: string, userId: string): Promise<ChatDTO> {
    return await createChat(content, userId);
  }
}
