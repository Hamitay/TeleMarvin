import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { parseSQLDateToString } from '../utils/dateUtils';
import messages from './messages';
import MessageResponse from './CommandResponse/MessageResponse';
import CommandResponse from './CommandResponse';
import { WeeklySessionService } from '../services/WeeklySessionService';

export default class AddNewSessionCommand implements Command {

  #sessionService: SessionService;

  #weeklySessionService: WeeklySessionService;

  constructor() {
    this.#sessionService = new SessionService;
    this.#weeklySessionService = new WeeklySessionService;
  }

  async execute(groupId: string): Promise<CommandResponse> {
    const session = await this.#sessionService.getNextSession(groupId);
    const weeklySessions = await this.#weeklySessionService.getWeeklySessionsForGroup(groupId);

    let msg = [];

    if (session) {
      msg.push(messages.NEXT_SESSION(parseSQLDateToString(session.date)));
    }

    if (weeklySessions.length > 0) {
      msg.push(messages.NEXT_WEEKLY_SESSION(weeklySessions[0].dow))
    }

    if(!msg.length) {
      return new MessageResponse(messages.NO_SESSION_SCHEDULED);
    }

    return new MessageResponse(msg.join('\n'))
    
  }
}
