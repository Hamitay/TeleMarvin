import { Session } from '../models';

export class SessionService {

  async findAllSessions() {
    const a = await Session.findAll();
    console.log(a)
  }

  async createSession(groupId: string, time: string, date: Date) {
    await Session.create({
      date,
      time,
      groupId
    });
  }
}
