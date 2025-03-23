// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { NewMessage } from '../db/schema';
import { MessageService } from './message.service';

@Route('v1/chats')
export class MessageController extends Controller {
  /**
   * Returns an array of messages for the specified chat. User identity (email) is extracted from JWT token.
   * @summary Get all messages for a chat
   */
  @Security('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
  @Get('{chatId}/messages')
  @Tags('Messages')
  public async getMessages(@Path() chatId: string): Promise<NewMessage[]> {
    return MessageService.getAll(chatId);
  }

  /**
   * Creates a new message in a specific chat. User identity (email) is extracted from JWT token.
   * @summary Create a new message
   */
  @Security('BearerAuth')
  @Post('{chatId}/messages')
  @Tags('Messages')
  public async createMessage(
    @Body() body: { content: string },
    @Path() chatId: string,
    @Request() request: any
  ): Promise<NewMessage> {
    // TODO why is there no email in request.user?
    // this also needs to be checked first
    console.warn('userId from token ---->', request.user.preferred_username);
    return MessageService.create(
      chatId,
      body.content,
      request.user.preferred_username
    );
  }
}
