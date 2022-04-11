import { Command } from './Command';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';

const helpMessage =
  'Those are the functions Telemarvin current has: \n' +
  '- <b>help</b>: well, duh? \n' +
  '- <b>newSession</b> <i>dd/mm/yy</i>: Registers a new session for this chat.' +
  ' This must be set in the future. On the day of the session at 10:30 Telemarvin will send a reminder together with a poll.\n' +
  '- <b>nextSession</b>: Prints the earliest next session date. \n' +
  '- <b>deleteSession</b>: <i>dd/mm/yy</i>: Deletes the session at the given date. \n' +
  '- <b>instantPool</b>: Creates a sample session hour pool, for those spontaneous sessions. \n' +
  '- <b>weekPool</b>: Creates a sample week pool, for those hard to schedule weeks. \n' +
  '- <b>weekly</b> <i>day-of-week</i>: Registers a new weekly session for this chat. \n' 
  ' \n' +
  'Are you missing any feature? Feel free to open an issue or even a PR on ' +
  '<a href="https://github.com/Hamitay/TeleMarvin/">TeleMarvin\'s repo @ Github</a>'

export default class UnknownCommand implements Command {
  async execute(): Promise<CommandResponse> {
    return new MessageResponse(helpMessage);
  }
}
