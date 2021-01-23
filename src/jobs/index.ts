import { Telegraf } from 'telegraf';
import { CronJob } from 'cron';
import { SessionService } from '../services/SessionService';

const TIMEZONE = 'America/Sao_Paulo';

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
      '0 16 11 * * *',
      async () => await this.nextSessionJob(),
      null,
      true,
      TIMEZONE
    );
    //job.start();

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
      const message = `It seems you have scheduled a session for today ${session.date}. But when?`;
      this.#bot.telegram.sendPoll(
        session.groupId,
        message,
        ['17h', '18h', '19h', '20h', '21h', 'Other'],
        { is_anonymous: false, allows_multiple_answers: true }
      );
    });
  }
}
