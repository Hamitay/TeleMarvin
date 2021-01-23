import { Command } from './Command';

export default class UnknownCommand implements Command {
  async execute(): Promise<string> {
    return await "I can't understand what you are saying";
  }
}
