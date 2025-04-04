// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ERROR_401, ERROR_422, ErrorDTO } from '../errors';
import { logger } from '../logger';
import { getChatsMetricMiddleware } from '../metrics';
import { ChatCreateDTO, ChatDTO } from './chat.models';
import { ChatService } from './chat.service';

@Route('v1/chats')
export class ChatsController extends Controller {
  /**
   * Returns an array of chats owned by the user. User identity (email) is extracted from JWT token.
   * @summary Get all chats for a user
   */
  @Response<ErrorDTO>(401, ERROR_401)
  @Security('BearerAuth') // add role checks like this: @Security('BearerAuth', ['admin'])
  @Get()
  @Tags('Chats')
  @Middlewares(getChatsMetricMiddleware)
  public async getChats(@Request() request: any): Promise<ChatDTO[]> {
    // TODO why is there no email in request.user?
    // this also needs to be checked first
    logger.info(
      'getChats userId from token: ',
      request.user.preferred_username
    );
    return ChatService.getAll(request.user.preferred_username);
  }

  /**
   * Creates a new chat with the initial message content. User identity (email) is extracted from JWT token.
   * @summary Create a new chat
   */
  @Response<ErrorDTO>(422, ERROR_422)
  @Response<ErrorDTO>(401, ERROR_401)
  @Security('BearerAuth')
  @Post()
  @Tags('Chats')
  public async createChat(
    @Body() body: ChatCreateDTO,
    @Request() request: any
  ): Promise<ChatDTO> {
    // TODO why is there no email in request.user?
    // this also needs to be checked first
    logger.info(
      'getChats userId from token: ',
      request.user.preferred_username
    );
    return ChatService.create(body.content, request.user.preferred_username);
  }
}
