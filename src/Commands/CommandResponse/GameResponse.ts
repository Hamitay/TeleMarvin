import { Context, Markup } from 'telegraf';
import CommandResponse from '.';

const gameShortName = 'grumble';

const markup = Markup.inlineKeyboard([
  Markup.button.game('Play now 😈'),
])

export default class GameResponse implements CommandResponse {
  async respond(botContext: Context): Promise<void> {
    await botContext.replyWithGame(gameShortName, markup)
  }
}
