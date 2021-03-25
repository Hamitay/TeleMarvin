import { Command } from './Command';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';

const EasterMessageMap: { [id: string] : string} = {
  easter: 'So... you\'re looking for some easter eggs huh? You gonna have to try harder than this.' +
   'These kind of hunts have layers, like onions.',
  grumblejack: 'It seems you\'re on the right track. However I need a little less data, perhaps Mr. Ray could help you?',
  ogre: 'They are people too you know? They have names, and the one I\'m talking about is not an all star',
  jack: 'Almost, but not quite, I wasn\'t really expecting much of you, try to reverse your logic',
}

export default class EasterEggCommand implements Command {
  #message: string

  constructor(directive: string) {
    this.#message = EasterMessageMap[directive];
  }

  async execute(): Promise<CommandResponse> {
    return new MessageResponse(this.#message);
  }
}
