import { session, Telegraf } from 'telegraf';
import { CronJob } from 'cron';
import { SessionService } from '../services/SessionService';
import { parseSQLDateToString } from '../utils/dateUtils';

import messages from './messages';
import { WeeklySessionService } from '../services/WeeklySessionService';

const TIMEZONE = 'America/Sao_Paulo';
const NEXT_SESSION_OPTIONS = ['18h', '18h30', '19h', '19h30', '20h', '20h30', '21h', 'Other'];

const NEXT_SESSION_CRON = '0 30 10 * * * ';
const NEXT_WEEKLYSESSION_CRON = '0 31 10 * * * ';

export class Jobs {
  #bot: Telegraf;

  #sessionService: SessionService;

  #weeklySessionService: WeeklySessionService;

  constructor(bot: Telegraf) {
    this.#bot = bot;
    this.#sessionService = new SessionService();
    this.#weeklySessionService = new WeeklySessionService();
  }

  setUpJobs(): void {
    const job = new CronJob(
      NEXT_SESSION_CRON,
      async () => await this.nextSessionJob(),
      null,
      true,
      TIMEZONE
    );

    const weeklySessionJob = new CronJob(
      NEXT_WEEKLYSESSION_CRON,
      async () => await this.nextWeeklySession(),
      null,
      true,
      TIMEZONE
    )

    const stopJobs = () => {
      console.info('Stopping cron jobs');
      job.stop();
      weeklySessionJob.stop();
    };

    // Stop jobs on process exit
    process.once('SIGINT', stopJobs);
    process.once('SIGTERM', stopJobs);
  }

  async nextWeeklySession(): Promise<void> {
    const sessions = await this.#weeklySessionService.getWeeklySessionsOfTheDay();
    sessions.forEach((session) => {
      this.#bot.telegram.sendPoll(
        session.groupId,
        messages.WEEKLY_POLL_MESSAGE(session.dow),
        NEXT_SESSION_OPTIONS,
        { is_anonymous: false, allows_multiple_answers: true }
      )
    })
  }

  async nextSessionJob(): Promise<void> {
    const sessions = await this.#sessionService.getTodaysSession();
    sessions.forEach((session) => {
      this.#bot.telegram.sendPoll(
        session.groupId,
        messages.POLL_MESSAGE(parseSQLDateToString(session.date)),
        NEXT_SESSION_OPTIONS,
        { is_anonymous: false, allows_multiple_answers: true }
      );
    });
  }
}
