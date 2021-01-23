import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { convertDateStringToBrazilianDateString } from '../utils';
import messages from './messages';

export default class AddNewSessionCommand implements Command {

  #sessionService: SessionService;

  constructor() {
    this.#sessionService = new SessionService;
  }

  async execute(groupId: string): Promise<string> {
    const session = await this.#sessionService.getNextSession(groupId);

    if (session) {
      // TODO: better date treatment
      const rawDate = session.date instanceof Date ? session.date.toDateString() : session.date;
      return messages.NEXT_SESSION(convertDateStringToBrazilianDateString(rawDate));
    }

    return messages.NO_SESSION_SCHEDULED;
  }
}
