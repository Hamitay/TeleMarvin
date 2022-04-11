import { WeeklySession } from "../models";
import { DayOfWeek } from "../models/enum/DayOfWeek";
import { WeeklySessionRepository } from "../repositories/WeeklySessionRepository";

export class WeeklySessionService {
  #weeklySessionRepository: WeeklySessionRepository;

  constructor() {
    this.#weeklySessionRepository = new WeeklySessionRepository();
  }

  async createSession(groupId: string, dow: DayOfWeek): Promise<void> {
    await this.#weeklySessionRepository.createWeeklySession(groupId, dow);
  }

  async getWeeklySessionsOfTheDay(): Promise<WeeklySession[]> {
    const today = new Date();
    const dow = Object.values(DayOfWeek)[today.getDay()];
    return await this.#weeklySessionRepository.getWeeklySessionsOfTheDay(dow);
  }

  async getWeeklySessionsForGroup(groupId: string): Promise<WeeklySession[]> {
    return await this.#weeklySessionRepository.getWeeklySessionsForGroup(
      groupId
    );
  }
}
