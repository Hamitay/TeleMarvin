import { UniqueConstraintError } from "sequelize";
import { BaseError } from "../exceptions/BaseError";
import { ConstrainError } from "../exceptions/ConstrainError";
import { WeeklySession } from "../models/WeeklySession";
import { DayOfWeek } from "../models/enum/DayOfWeek";

export class WeeklySessionRepository {
  async createWeeklySession(groupId: string, dow: DayOfWeek): Promise<void> {
    try {
      await WeeklySession.create({ groupId, dow });
    } catch (error) {
      console.error(error);
      if (error instanceof UniqueConstraintError) {
        throw new ConstrainError();
      } else {
        throw new BaseError();
      }
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

  async getWeeklySessionsForGroup(groupId: string): Promise<WeeklySession[]> {
    const sessions = await WeeklySession.findAll({
      where: {
        groupId,
      },
    });
    return await sessions;
  }
}
