import { createMessage, getMessages } from '../db/queries/messages';
import { NewMessage } from '../db/schema';

export class MessageService {
  static async getAll(chatId: string): Promise<NewMessage[]> {
    return await getMessages(chatId);
  }

  static async create(
    chatId: string,
    message: string,
    userId: string
  ): Promise<NewMessage> {
    return await createMessage({
      userId,
      content: message,
      chatId: chatId,
    });
  }
}
