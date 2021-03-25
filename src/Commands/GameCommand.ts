import { Command } from './Command';
import CommandResponse from './CommandResponse';
import GameResponse from './CommandResponse/GameResponse';

export default class GameCommand implements Command {
  async execute(): Promise<CommandResponse> {
    return new GameResponse();
  }

}
