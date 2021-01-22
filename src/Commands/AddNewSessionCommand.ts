import { Command } from './Command';
import { SessionService } from '../services/SessionService';
import messages from './messages';

const DATE_PATTERN = /(\d{2}\/\d{1,2}\/\d{1,4})/

const getBrazilianCurrentTime = () => new Date(new Date().toLocaleString("en-US", {timeZone: "timezone id"}));

export default class AddNewSessionCommand implements Command {

  #parameters: string [];

  #sessionService: SessionService;

  constructor(parameters: string []) {
    this.#parameters = parameters;
    this.#sessionService = new SessionService;
  }

  areParametersValid(): boolean {
    const date = this.#parameters[0];
    const time = this.#parameters[1];

    if (!date || !time) {
      return false
    }

    if (!DATE_PATTERN.test(date)) {
      return false;
    }

    return true;
  }

  isDateInsane(year: number, month: number, day: number): boolean {
    // TODO: check month by month
    return year < 0 || month < 0 || day < 0 || day > 31 || month > 12;
  }

  buildDate(year: number, month: number, day: number): Date {
    const saneYear = year < 100 ? 2000 + year : year;
    return new Date(saneYear, month - 1, day, 23, 59, 59, 0);
  }

  execute(groupId: string): string {
    if (!this.areParametersValid()) {
      return messages.INVALID_PARAMETERS;
    }

    // Builds date
    const rawDate = this.#parameters[0];
    const time = this.#parameters[1];
    const splitDate = rawDate.split("/")

    const year = parseInt(splitDate[2]);
    const month = parseInt(splitDate[1]);
    const day = parseInt(splitDate[0]);

    // Sanity check
    if (this.isDateInsane(year, month, day)) {
      return messages.INSANE_DATE;
    }

    const date = this.buildDate(year, month, day);

    this.#sessionService.createSession(groupId, time, date);
    return messages.NEW_SESSION(rawDate, time);
  }
}
