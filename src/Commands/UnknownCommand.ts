import { Command } from './Command';

export default class UnknownCommand implements Command {
  execute(): string {
    return "I can't understand what you are saying"
  }
}
