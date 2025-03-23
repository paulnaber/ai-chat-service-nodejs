// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { NewChat } from '../db/schema';
import { ValidateErrorJSON } from '../errors';
import { ChatService } from './chat.service';

@Route('v1/chats')
export class ChatsController extends Controller {
  /**
   * Returns an array of chats owned by the user. User identity (email) is extracted from JWT token.
   * @summary Get all chats for a user
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Security('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
  @Get()
  @Tags('Chats')
  public async getChats(): Promise<NewChat[]> {
    return ChatService.getAll();
  }

  /**
   * Creates a new chat with the initial message content. User identity (email) is extracted from JWT token.
   * @summary Create a new chat
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Security('BearerAuth')
  @Post()
  @Tags('Chats')
  public async createChat(@Body() body: NewChat): Promise<NewChat> {
    return ChatService.create(body);
  }
}
