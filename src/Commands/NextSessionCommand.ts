import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { parseSQLDateToString } from '../utils/dateUtils';
import messages from './messages';
import MessageResponse from './CommandResponse/MessageResponse';
import CommandResponse from './CommandResponse';

export default class AddNewSessionCommand implements Command {

  #sessionService: SessionService;

  constructor() {
    this.#sessionService = new SessionService;
  }

  async execute(groupId: string): Promise<CommandResponse> {
    const session = await this.#sessionService.getNextSession(groupId);

    if (session) {
      return new MessageResponse(messages.NEXT_SESSION(parseSQLDateToString(session.date)));
    }

    return new MessageResponse(messages.NO_SESSION_SCHEDULED);
  }
}
