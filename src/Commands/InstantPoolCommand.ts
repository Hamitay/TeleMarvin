import { Command } from './Command';
import CommandResponse from './CommandResponse';
import HourPollResponse from './CommandResponse/HourPollResponse';

const poolMessage = 'So, someone couldn\'t schedule the session beforehand? It\'s not like you have a tool made specifically for this.'

export default class InstantPoolCommand implements Command {
  async execute(): Promise<CommandResponse> {
    return new HourPollResponse(poolMessage);
  }
}
