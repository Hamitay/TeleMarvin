import { Model, DataTypes } from 'sequelize';
import { databaseInstance } from '../db';
import { DayOfWeek } from './enum/DayOfWeek';

const TABLE_NAME = 'weekly_sessions';
export class WeeklySession extends Model {
  public id!: number;
  public dow!: DayOfWeek;
  public groupId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WeeklySession.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    dow: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'group_dow_constrain'
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'group_dow_constrain'
    },
  },
  {
    tableName: TABLE_NAME,
    sequelize: databaseInstance,
  },

);


WeeklySession.sync().then(() => console.info('Weekly session table created!'));
