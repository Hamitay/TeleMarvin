import { Command } from './Command';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';
export default class UnknownCommand implements Command {
  async execute(): Promise<CommandResponse> {
    return new MessageResponse('I can\'t understand what you are saying');
  }
}
