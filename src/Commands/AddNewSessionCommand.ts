import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import messages from './messages';

import { ConstrainError } from '../exceptions/ConstrainError';

import { parseStringToDateTime, isDateInThePast } from '../utils/dateUtils';
import CommandResponse from './CommandResponse';
import MessageResponse from './CommandResponse/MessageResponse';
export default class AddNewSessionCommand implements Command {

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

    if (isDateInThePast(dateTime)) {
      return new MessageResponse(messages.TIME_TRAVELER);
    }

    try {
      await this.#sessionService.createSession(groupId, dateTime.toJSDate());
    } catch(error) {
      if (error instanceof ConstrainError) {
        return new MessageResponse(messages.CONSTRAIN_ERROR(dateString));
      }

      return new MessageResponse(messages.UNKNOWN_ERROR);
    }

    return new MessageResponse(messages.NEW_SESSION(dateString));
  }
}
