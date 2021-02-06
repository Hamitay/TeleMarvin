import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { parseStringToDateTime } from '../utils/dateUtils';

import messages from './messages';

export default class RemoveSessionCommand implements Command {

  #parameters: string [];

  #sessionService: SessionService;

  constructor(parameters: string []) {
    this.#parameters = parameters;
    this.#sessionService = new SessionService;
  }

  async execute(groupId: string): Promise<string> {
    const dateString = this.#parameters[0];

    if (!dateString) {
      return messages.INVALID_PARAMETERS;
    }

    const dateTime = parseStringToDateTime(dateString);

    if (!dateTime.isValid) {
      return messages.INSANE_DATE;
    }

    try {
      await this.#sessionService.deleteSessionByDateAndGroupId(groupId, dateTime.toJSDate());
    } catch(error) {
      return messages.UNKNOWN_ERROR;
    }

    return messages.SESSION_DELETED(dateString);
  }
}
