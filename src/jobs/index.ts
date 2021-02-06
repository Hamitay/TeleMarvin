import { Telegraf } from 'telegraf';
import { CronJob } from 'cron';
import { SessionService } from '../services/SessionService';

import messages from './messages';

const TIMEZONE = 'America/Sao_Paulo';
const NEXT_SESSION_OPTIONS = ['17h', '18h', '19h', '20h', '21h', 'Other'];

const NEXT_SESSION_CRON = '0 30 10 * * * ';
export class Jobs {
  #bot: Telegraf;

  #sessionService: SessionService;

  constructor(bot: Telegraf) {
    this.#bot = bot;
    this.#sessionService = new SessionService();
    this.setUpJobs();
  }

  setUpJobs(): void {
    const job = new CronJob(
      NEXT_SESSION_CRON,
      async () => await this.nextSessionJob(),
      null,
      true,
      TIMEZONE
    );

    const stopJobs = () => {
      console.info('Stopping cron jobs');
      job.stop();
    };

    // Stop jobs on process exit
    process.once('SIGINT', stopJobs);
    process.once('SIGTERM', stopJobs);
  }

  async nextSessionJob(): Promise<void> {
    const sessions = await this.#sessionService.getTodaysSession();
    sessions.forEach((session) => {
      this.#bot.telegram.sendPoll(
        session.groupId,
        messages.POLL_MESSAGE(session.date),
        NEXT_SESSION_OPTIONS,
        { is_anonymous: false, allows_multiple_answers: true }
      );
    });
  }
}
