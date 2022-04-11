import { Command } from "./Command";
import messages from "./messages";

import { ConstrainError } from "../exceptions/ConstrainError";

import CommandResponse from "./CommandResponse";
import MessageResponse from "./CommandResponse/MessageResponse";
import { WeeklySessionService } from "../services/WeeklySessionService";
import { DayOfWeek } from "../models/enum/DayOfWeek";

export default class AddNewWeeklySessionCommand implements Command {
  #parameters: string[];

  #weeklySessionService: WeeklySessionService;

  constructor(parameters: string[]) {
    this.#parameters = parameters;
    this.#weeklySessionService = new WeeklySessionService();
  }

  convertParameterIntoDow(parameter: string): DayOfWeek | undefined {
    if ((<any>Object).values(DayOfWeek).includes(parameter.toUpperCase())) {
      return parameter.toUpperCase() as DayOfWeek
    }
    return undefined
  }

  async execute(groupId: string): Promise<CommandResponse> {
    const dowString = this.#parameters[0];

    const dow = this.convertParameterIntoDow(dowString);

    if (!dow) {
        return new MessageResponse(messages.INVALID_PARAMETERS)
    }


    try {
      await this.#weeklySessionService.createSession(groupId, dow)
    } catch(error) {
      console.error("ERRORRRR")
      if (error instanceof ConstrainError) {
        return new MessageResponse(messages.WEEKLY_CONSTRAIN_ERROR(dowString));
      }

      return new MessageResponse(messages.UNKNOWN_ERROR);
    }

    return new MessageResponse(messages.NEW_WEEKLY_SESSION(dowString));
  }
}
