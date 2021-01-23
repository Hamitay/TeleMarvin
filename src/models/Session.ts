import { group } from 'console';
import { Model, DataTypes } from 'sequelize';
import { databaseInstance } from '../db';

const TABLE_NAME = 'sessions';
export class Session extends Model {
  public id!: number;
  public date!: Date;
  public groupId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Session.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: 'group_date_constrain'
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'group_date_constrain'
    },
  },
  {
    tableName: TABLE_NAME,
    sequelize: databaseInstance,
  },

);


Session.sync().then(() => console.info("Session table created!"));
