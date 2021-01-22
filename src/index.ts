import { Telegraf, Context } from 'telegraf';
import { Message } from 'typegram/message';

import { CommandFactory } from './Commands';

// To do add config file
const TOKEN = '';
const marvinRegex = /(_marvin)|(_m)\s.*/;

class BotService {
  #bot: Telegraf;

  #commandPattern: RegExp;

  #commandFactory: CommandFactory;

  constructor() {
    // Load token from config
    console.info('Loading telegram bot config');
    this.#bot = new Telegraf(TOKEN);
    this.#commandPattern = marvinRegex;
    this.#commandFactory = new CommandFactory();

    console.info('Registering bot commands');
    this.registerBot();
  }

  launchBot(): void {
    console.info('Launching bot service');
    this.#bot.launch();
    console.info('Bot service successfully launched');
  }

  registerBot(): void {
    this.#bot.hears(this.#commandPattern, (context) =>
      this.processMessage(context)
    );
  }

  async processMessage(context: Context) {
    const message = context.message as Message.TextMessage;
    const groupId = context.chat?.id;
    const args = message.text.split(' ').slice(1);

    const command = this.#commandFactory.getCommand(args);

    const response = command.execute(groupId?.toString());

    await context.reply(response);
  }
}

const service = new BotService();
service.launchBot();
