import { Model, DataTypes } from 'sequelize';
import { databaseInstance } from '../db';

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

Session.sync().then(() => console.info("Session table created!"));
