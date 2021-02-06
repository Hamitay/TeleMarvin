import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { parseSQLDateToString } from '../utils/dateUtils';
import messages from './messages';

export default class AddNewSessionCommand implements Command {

  #sessionService: SessionService;

  constructor() {
    this.#sessionService = new SessionService;
  }

  async execute(groupId: string): Promise<string> {
    const session = await this.#sessionService.getNextSession(groupId);

    if (session) {
      return messages.NEXT_SESSION(parseSQLDateToString(session.date));
    }

    return messages.NO_SESSION_SCHEDULED;
  }
}
