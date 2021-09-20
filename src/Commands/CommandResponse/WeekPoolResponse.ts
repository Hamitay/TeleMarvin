import { DateTime } from 'luxon';
import { Context } from 'telegraf';
import CommandResponse from '.';

export default class PoolResponse implements CommandResponse {
  #message: string;

  #dateProvider: () => DateTime;
  #weekDayProvider: (date: DateTime) => string;

  constructor(message: string, dateProvider: () => DateTime, weekDayProvider: (date: DateTime) => string) {
    this.#message = message;
    this.#dateProvider = dateProvider;
    this.#weekDayProvider = weekDayProvider;
  }


  getDays(days: number) {
    const today = this.#dateProvider();

    return Array.from(Array(days)).map((_, index) => {
      const day = today.plus(({ days: index }))
      return `${this.#weekDayProvider(day)} - ${day.day}/${day.month}`
    })
  }

  async respond(botContext: Context): Promise<void> {

    await botContext.replyWithPoll(
      this.#message,
      this.getDays(7),
      { is_anonymous: false, allows_multiple_answers: true },
    );
  }
}
