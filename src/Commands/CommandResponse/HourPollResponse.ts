import { Context } from 'telegraf';
import CommandResponse from '.';

const NEXT_SESSION_OPTIONS = ['18h', '18h30', '19h', '19h30', '20h', '20h30', '21h', 'Other'];

export default class PoolResponse implements CommandResponse {
  #message: string;

  constructor(message: string) {
    this.#message = message;
  }

  async respond(botContext: Context): Promise<void> {
    await botContext.replyWithPoll(
      this.#message,
      NEXT_SESSION_OPTIONS,
      { is_anonymous: false, allows_multiple_answers: true},
    );
  }
}
