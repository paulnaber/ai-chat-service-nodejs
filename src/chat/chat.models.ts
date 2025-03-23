import { chats } from '../db/schema';

// TODO figure out how this works with tsos
// until then we have to create the type manually
export type _ChatDTO = typeof chats.$inferInsert;

export type ChatDTO = {
  userId: string;
  id?: string | undefined;
  title?: string | undefined;
  lastActiveDate?: Date | undefined;
};

export type ChatCreateDTO = {
  content: string;
};
