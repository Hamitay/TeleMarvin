import { Session } from '../models';
import { Op, UniqueConstraintError } from 'sequelize';
import { BaseError } from '../exceptions/BaseError';
import { ConstrainError } from '../exceptions/ConstrainError';
export class SessionRepository {
  async createSession(
    groupId: string,
    date: Date
  ): Promise<void> {
    try {
      await Session.create({
        date,
        groupId,
      });
    } catch(error) {
      console.error(error);
      if(error instanceof UniqueConstraintError) {
        throw new ConstrainError();
      } else {
        throw new BaseError();
      }
    }

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

  async deleteSessionByDateAndGroupId(groupId: string, date: Date): Promise<number> {
    return await Session.destroy({
      where: {
        [Op.and]: [{ groupId }, { date }]
      },
    });
  }

  async getSessionByDateRange(lowerDate: number, upperDate: number): Promise<Session[]> {
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
