import { Session } from '../models';
import { Op } from 'sequelize';

export class SessionRepository {
  async createSession(
    groupId: string,
    date: Date
  ): Promise<void> {
    await Session.create({
      date,
      groupId,
    });
  }

  async getSessionsAfterDateByGroupId(
    groupId: string,
    date: Date
  ): Promise<Session[]> {
    return await Session.findAll({
      where: {
        [Op.and]: [{ groupId }, { date: { [Op.gte]: date } }],
      },
      order: [['date', 'ASC']],
    });
  }

  async getSessionByDateRange(lowerDate: number, upperDate: number) {
    const sessions = await Session.findAll({
      where: {
        date: {
          [Op.gte]: lowerDate,
          [Op.lte]: upperDate,
        },
      },
    });
    return await sessions;
  }
}
