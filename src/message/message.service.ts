import { createMessage, getMessages } from '../db/queries/messages';
import { MessageDTO } from './message.models';

export class MessageService {
  static async getAll(chatId: string): Promise<MessageDTO[]> {
    return await getMessages(chatId);
  }

  static async create(
    chatId: string,
    message: string,
    userId: string
  ): Promise<MessageDTO> {
    return await createMessage({
      userId,
      content: message,
      chatId: chatId,
    });
  }
}
