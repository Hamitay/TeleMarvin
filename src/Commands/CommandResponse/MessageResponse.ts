import { Context } from 'telegraf';
import CommandResponse from '.';

export default class MessageResponse implements CommandResponse {
  #message: string;

  constructor(message: string) {
    this.#message = message;
  }

  async respond(botContext: Context): Promise<void> {
    await botContext.reply(this.#message, { parse_mode: 'HTML' });
  }
}
