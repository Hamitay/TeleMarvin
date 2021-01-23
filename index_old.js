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

const commands = {
  newSession: createNewSession,
  nextSession: fetchNextSessions,
  newRec: createNewRecurringSession,
  rec: fetchTodayRecurring,
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

