import { Model, DataTypes } from 'sequelize';
import { databaseInstance } from '../db';

export class Session extends Model {
  public id!: number;
  public date!: Date;
  public time!: string;
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
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'sessions',
    sequelize: databaseInstance,
  }
);

Session.sync().then(() => console.log("Session table created!"));
