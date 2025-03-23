import { messages } from '../db/schema';

// TODO figure out how this works with tsos
// until then we have to create the type manually
export type _MessageDTO = typeof messages.$inferInsert;

export type MessageDTO = {
  userId: string;
  content: string;
  chatId: string;
  id?: string | undefined;
  senderType?: string | undefined;
  createdAt?: Date | undefined;
};

export type MessageCreateDTO = {
  content: string;
};
