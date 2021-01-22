const { Telegraf } = require('telegraf');
const { init, addSession, getNextSessionByGroupId, addRecurringSession, getTodayCurrentSession } = require('./db');

const TOKEN = "1598758468:AAFxiBZ7CiSHpEY68Fd7OglbcqkKk0QmOoE"

const bot = new Telegraf(TOKEN)
init()

const marvinRegex = /(_marvin)|(_m)\s.*/

const informGroups = async () => {
  const todaySessions = await getTodayCurrentSession();

  todaySessions.forEach((session) => {
    const groupId = session.dataValues.groupId;
    bot.telegram.sendMessage(groupId, "There's a session scheduled for today. Sigh, will everyone be present?")
  })
}

const createNewSession = async (args, groupId, ctx) => {
  const date = args[2];
  const time = args[3];
  const datePart = date.split("/")
  await addSession(groupId, datePart[0], datePart[1],  datePart[2], time)
}

const createNewRecurringSession = async (args, groupId, ctx) => {
  const weekday = args[2];
  await addRecurringSession(groupId, weekday);
  const message = `Scheduling a recurring session every ${weekday.toLowerCase()}`
  ctx.reply(message)
}

const fetchTodayRecurring = async (arcs, groupId, ctx) => {
  const sessions = await getTodayCurrentSession();
  console.log(sessions);
}

const fetchNextSessions = async (args, groupId, ctx) => {
  const nextSession = await getNextSessionByGroupId(groupId);

  if (!nextSession)
    ctx.reply("There is no session scheduled for this sorry group");

  const splitDate = nextSession.date.split('-');
  const formattedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  const message = `Next session scheduled for ${formattedDate} at ${nextSession.time}`;
  ctx.reply(message);
}

const commands = {
  newSession: createNewSession,
  nextSession: fetchNextSessions,
  newRec: createNewRecurringSession,
  rec: fetchTodayRecurring,
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
informGroups();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

