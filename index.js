const { Telegraf } = require('telegraf');

const TOKEN = ""

const bot = new Telegraf(TOKEN)

bot.start((ctx) => ctx.reply('Don\'t talk to me about life'));
bot.hears('_marvin', (ctx) => ctx.reply('What?'));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
