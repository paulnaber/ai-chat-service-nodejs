// src/users/usersController.ts
// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ERROR_401, ERROR_422, ErrorDTO } from '../errors';
import { MessageCreateDTO, MessageDTO } from './message.models';
import { MessageService } from './message.service';

@Route('v1/chats')
export class MessageController extends Controller {
  /**
   * Returns an array of messages for the specified chat. User identity (email) is extracted from JWT token.
   * @summary Get all messages for a chat
   */
  @Response<ErrorDTO>(422, ERROR_422)
  @Response<ErrorDTO>(401, ERROR_401)
  @Security('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
  @Get('{chatId}/messages')
  @Tags('Messages')
  public async getMessages(@Path() chatId: string): Promise<MessageDTO[]> {
    return MessageService.getAll(chatId);
  }

  /**
   * Creates a new message in a specific chat. User identity (email) is extracted from JWT token.
   * @summary Create a new message
   */
  @Response<ErrorDTO>(422, ERROR_422)
  @Response<ErrorDTO>(401, ERROR_401)
  @Security('BearerAuth')
  @Post('{chatId}/messages')
  @Tags('Messages')
  public async createMessage(
    @Body() body: MessageCreateDTO,
    @Path() chatId: string,
    @Request() request: any
  ): Promise<MessageDTO> {
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
