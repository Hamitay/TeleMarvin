import { Command } from "./Command";
import CommandResponse from "./CommandResponse";
import WeekPoolResponse from './CommandResponse/WeekPoolResponse';

import { getCurrentTime, dateToWeekDay } from '../utils/dateUtils';

const MESSAGE = 'So you can\'t decide on day without my help? Why I\'m not suprised?'

export default class WeekPoolCommand implements Command {

    async execute(): Promise<CommandResponse> {
        return new WeekPoolResponse(MESSAGE, getCurrentTime, dateToWeekDay);
    }
}