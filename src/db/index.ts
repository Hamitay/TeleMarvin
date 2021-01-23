import { Sequelize } from 'sequelize';

export const databaseInstance = new Sequelize({
  dialect: 'sqlite',
  storage: 'tele_marvin.database',
});
