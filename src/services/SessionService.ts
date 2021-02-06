import { Session } from '../models/Session';
import { SessionRepository } from '../repositories';
import { getCurrentTime } from '../utils/dateUtils';
export class SessionService {

  #sessionRepository: SessionRepository;

  constructor() {
    this.#sessionRepository = new SessionRepository();
  }

  async createSession(groupId: string, date: Date) {
    await this.#sessionRepository.createSession(groupId, date);
  }

  async getNextSession(groupId: string): Promise<Session | undefined> {
    const now = getCurrentTime();
    const sessions = await this.#sessionRepository.getSessionsAfterDateByGroupId(groupId, now.toJSDate())

    if (sessions && sessions.length > 0) {
      return sessions[0].get();
    }
    return undefined
  };

  async getTodaysSession(): Promise<Session[]> {
    const lowerTime = new Date().setHours(0,0, 0, 0);
    const upperTime = new Date().setHours(23, 59, 59, 0);

    const sessions = await this.#sessionRepository.getSessionByDateRange(lowerTime, upperTime);
    return sessions;
  }

  async deleteSessionByDateAndGroupId(groupId: string, date: Date) {
    await this.#sessionRepository.deleteSessionByDateAndGroupId(groupId, date);
  }
}
