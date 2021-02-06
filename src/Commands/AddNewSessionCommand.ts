import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import messages from './messages';

import { ConstrainError } from '../exceptions/ConstrainError';

import { parseStringToDateTime, isDateInThePast } from '../utils/dateUtils';
export default class AddNewSessionCommand implements Command {

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

    if (isDateInThePast(dateTime)) {
      return messages.TIME_TRAVELER;
    }

    try {
      await this.#sessionService.createSession(groupId, dateTime.toJSDate());
    } catch(error) {
      if (error instanceof ConstrainError) {
        return messages.CONSTRAIN_ERROR(dateString);
      }

      return messages.UNKNOWN_ERROR;
    }

    return messages.NEW_SESSION(dateString);
  }
}
