import { getChats } from '../db/queries/users';
import { NewChat } from '../db/schema';

export class ChatService {
  static async getAll(): Promise<NewChat[]> {
    return await getChats();
  }

  // static async create(player: PlayerDto): Promise<PlayerDto> {
  //   const newPlayer: IPlayer = await Player.create(player);
  //   if (newPlayer) {
  //     return {
  //       average: newPlayer.average,
  //       averageDartCount: newPlayer.averageDartCount,
  //       checkout: newPlayer.checkout,
  //       checkoutDartCount: newPlayer.checkoutDartCount,
  //       highscore: newPlayer.highscore,
  //       id: newPlayer._id,
  //       month: newPlayer.month,
  //       name: newPlayer.name,
  //       oneHundredEightyCount: newPlayer.oneHundredEightyCount,
  //       oneHundredFortyPlusCount: newPlayer.oneHundredFortyPlusCount,
  //       oneHundredPlusCount: newPlayer.oneHundredPlusCount,
  //     };
  //   }
  //   return null;
  // }

  // static async delete(id: string): Promise<boolean> {
  //   const deletedPlayer: IPlayer = await Player.findByIdAndDelete(id);
  //   return !!deletedPlayer;
  // }

  // static async update(id: string, player: PlayerDto): Promise<PlayerDto> {
  //   const updatePlayer: IPlayer = await Player.findByIdAndUpdate(id, player);
  //   const updatedPlayer: IPlayer = await Player.findById(id);
  //   if (updatedPlayer && updatePlayer) {
  //     return updatedPlayer;
  //   }
  //   return null;
  // }
}
