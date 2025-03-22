// src/users/usersController.ts
import { Controller, Get, Route, Security, Tags } from 'tsoa';
import { NewChat } from '../../db/schema.js';
import { ChatService } from './chat.service';

// interface ValidateErrorJSON {
//   message: 'Validation failed';
//   details: { [name: string]: unknown };
// }

@Route('v1/chats')
export class ChatsController extends Controller {
  /**
   * Get all Players
   */
  @Security('BearerAuth', ['admin'])
  @Get()
  @Tags('Chats')
  public async getChats(): Promise<NewChat[]> {
    return ChatService.getAll();
  }

  // /**
  //  * Update a single Player
  //  */
  // @Security('BearerAuth', ['admin'])
  // @Put('{id}')
  // @Tags('Chats')
  // public async updatePlayer(
  //   @Path() id: string,
  //   @Body() body: PlayerDto
  // ): Promise<PlayerDto> {
  //   return PlayerService.update(id, body);
  // }

  // /**
  //  * Create a single Player
  //  */
  // @Security('BearerAuth', ['admin'])
  // @Post()
  // @Response<ValidateErrorJSON>(422, 'Validation Failed')
  // @Tags('Players')
  // public async createPlayer(@Body() body: PlayerDto): Promise<PlayerDto> {
  //   return PlayerService.create(body);
  // }

  // /**
  //  * Delete a single Player
  //  */
  // @Security('BearerAuth', ['admin'])
  // @Delete('{id}')
  // @Tags('Players')
  // public async deletePlayer(@Path() id: string): Promise<boolean> {
  //   return PlayerService.delete(id);
  // }
}
