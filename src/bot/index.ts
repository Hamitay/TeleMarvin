import { Telegraf, Context } from 'telegraf';
import { Message } from 'typegram/message';

import { CommandFactory } from '../Commands';

const marvinRegex = /(_marvin)|(_m)\s.*/;

export class BotService {
  #bot: Telegraf;

  #commandPattern: RegExp;

  #commandFactory: CommandFactory;

  constructor(token: string) {
    this.#bot = new Telegraf(token);
    this.#commandPattern = marvinRegex;
    this.#commandFactory = new CommandFactory();

    console.info('Registering bot commands');
    this.registerBot();

    // Enable graceful stop
    process.once('SIGINT', () => this.#bot.stop('SIGINT'))
    process.once('SIGTERM', () => this.#bot.stop('SIGTERM'))
  }

  getInstance(): Telegraf {
    return this.#bot;
  }

  launchBot(): void {
    console.info('Launching bot service');
    this.#bot.launch();
    console.info('Bot service successfully launched');
  }

  registerBot(): void {
    // Default Commands
    this.#bot.hears(this.#commandPattern, (context) =>
      this.processMessage(context)
    );
  }

  async processMessage(context: Context): Promise<void> {
    const message = context.message as Message.TextMessage;
    const groupId = context.chat?.id;
    const args = message.text.split(' ').slice(1);
    const command = this.#commandFactory.getCommand(args);
    const response = await command.execute(groupId?.toString());

    await response.respond(context);
  }
}
