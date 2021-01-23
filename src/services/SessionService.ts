import { Session } from '../models/Session';
import { SessionRepository } from '../repositories';
import { getBrazilianCurrentTime } from '../utils';
export class SessionService {

  #sessionRepository: SessionRepository;

  constructor() {
    this.#sessionRepository = new SessionRepository();
  }

  async createSession(groupId: string, time: string, date: Date) {
    await this.#sessionRepository.createSession(groupId, time, date);
  }

  async getNextSession(groupId: string): Promise<Session | undefined> {
    const now = getBrazilianCurrentTime();
    const sessions = await this.#sessionRepository.getSessionsAfterDateByGroupId(groupId, now)

    if (sessions && sessions.length > 0) {
      return sessions[0].get();
    }
    return undefined
  };
}
