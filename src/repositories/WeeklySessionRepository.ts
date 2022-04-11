import { ConstrainError } from "../exceptions/ConstrainError";
import { WeeklySession } from "../models";
import { DayOfWeek } from "../models/enum/DayOfWeek";

export class WeeklySessionRepository {
  async createWeeklySession(groupId: string, dow: DayOfWeek): Promise<void> {
    try {
      WeeklySession.create({ groupId, dow });
    } catch (error) {
      console.error(error);
    }
  }

  async getWeeklySessionsOfTheDay(dow: DayOfWeek): Promise<WeeklySession[]> {
    const sessions = await WeeklySession.findAll({
      where: {
        dow,
      },
    });
    return await sessions;
  }
}
