import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import { parseStringToDateTime } from '../utils/dateUtils';

import messages from './messages';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';

export default class RemoveSessionCommand implements Command {

  #parameters: string [];

  #sessionService: SessionService;

  constructor(parameters: string []) {
    this.#parameters = parameters;
    this.#sessionService = new SessionService;
  }

  async execute(groupId: string): Promise<CommandResponse> {
    const dateString = this.#parameters[0];

    if (!dateString) {
      return new MessageResponse(messages.INVALID_PARAMETERS);
    }

    const dateTime = parseStringToDateTime(dateString);

    if (!dateTime.isValid) {
      return new MessageResponse(messages.INSANE_DATE);
    }

    try {
      await this.#sessionService.deleteSessionByDateAndGroupId(groupId, dateTime.toJSDate());
    } catch(error) {
      return new MessageResponse(messages.UNKNOWN_ERROR);
    }

    return new MessageResponse(messages.SESSION_DELETED(dateString));
  }
}
