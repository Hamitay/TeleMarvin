import { Sequelize } from 'sequelize';

export const databaseInstance = new Sequelize({
  dialect: 'sqlite',
  storage: 'persistence/tele_marvin.database',
});
