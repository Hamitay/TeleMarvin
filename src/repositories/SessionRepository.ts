
import { Session } from '../models';
import { Op } from 'sequelize';

export class SessionRepository {

  async createSession(groupId: string, time: string, date: Date): Promise<void> {
    await Session.create({
      date,
      time,
      groupId
    });
  }

  async getSessionsAfterDateByGroupId(groupId: string, date: Date): Promise<Session[]> {
    return await Session.findAll({
      where: {
        [Op.and]: [{ groupId }, { date: { [Op.gte]: date } }],
      },
      order: [['date', 'ASC']],
    });
  };
}
