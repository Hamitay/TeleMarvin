const { Telegraf } = require('telegraf');
const { init, addSession, getNextSessionByGroupId } = require('./db');

const TOKEN = ""

const bot = new Telegraf(TOKEN)
init()

const marvinRegex = /(_marvin)|(_m)\s.*/

const createNewSession = async (args, groupId, ctx) => {
  const date = args[2];
  const time = args[3];
  const datePart = date.split("/")
  await addSession(groupId, datePart[0], datePart[1],  datePart[2], time)
}

const fetchNextSessions = async (args, groupId, ctx) => {
  const nextSession = await getNextSessionByGroupId(groupId);

  const splitDate = nextSession.date.split('-');
  const formattedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  const message = `Next session scheduled for ${formattedDate} at ${nextSession.time}`;
  ctx.reply(message);
}

const commands = {
  newSession: createNewSession,
  nextSession: fetchNextSessions,
}

const processCommand = async (ctx) => {
  const args = ctx.message.text.split(" ");
  const groupId = ctx.chat.id;

  const command = args[1];

  if(commands[command]) {
    ctx.reply('Lemme see what I can do');
    await commands[command](args, groupId, ctx);
  } else {
    ctx.reply('Unsurprisingly I can\'t understand your gibberish');
  }
}

bot.start((ctx) => ctx.reply('Don\'t talk to me about life'));
bot.hears(marvinRegex, async (ctx) => {
  processCommand(ctx);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

