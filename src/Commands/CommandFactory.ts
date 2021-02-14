import { Command } from './Command';
import AddNewSessionCommand from './AddNewSessionCommand';
import NextSessionCommand from './NextSessionCommand';
import UnknownCommand from './UnknownCommand';
import RemoveSessionCommand from './RemoveSessionCommand';
import InstantPoolCommand from './InstantPoolCommand';
import HelpCommand from './HelpCommand';
export class CommandFactory {
  getCommand(args: string []): Command {
    const directive = args[0];
    const parameters = args.slice(1);

    switch (directive) {
    case 'newSession':
      return new AddNewSessionCommand(parameters);
    case 'nextSession':
      return new NextSessionCommand();
    case 'deleteSession':
      return new RemoveSessionCommand(parameters);
    case 'help':
      return new HelpCommand();
    case 'instantPool':
      return new InstantPoolCommand();
    default:
      return new UnknownCommand();
    }
  }
}
