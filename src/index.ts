import { BotService } from './bot';
import { Jobs } from './jobs';
import * as dotenv from 'dotenv';

console.info('Loading configuration')
dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';

if (!TELEGRAM_TOKEN) {
  console.error('Missing telegram token!');
  process.exit();
}

const service = new BotService(TELEGRAM_TOKEN);
const jobs = new Jobs(service.getInstance());

service.launchBot();
