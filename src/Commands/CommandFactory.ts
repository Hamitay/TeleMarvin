import { Command } from './Command';
import AddNewSessionCommand from './AddNewSessionCommand';
import UnknownCommand from './UnknownCommand';

export class CommandFactory {

  constructor() {}

  getCommand(args: string []): Command {
    const directive = args[0];
    const parameters = args.slice(1);

    switch (directive) {
      case "newSession":
        return new AddNewSessionCommand(parameters);
      default:
        return new UnknownCommand();
    }
  }
}
