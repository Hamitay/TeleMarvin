import { Context } from 'telegraf';
import CommandResponse from '.';

const NEXT_SESSION_OPTIONS = ['17h', '18h', '19h', '20h', '21h', 'Other'];

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
