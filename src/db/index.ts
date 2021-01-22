import { Sequelize } from 'sequelize';

export const databaseInstance = new Sequelize({
  dialect: 'sqlite',
  storage: 'tele_marvin.database',
});

/*
const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log('Syncing models');
  await sequelize.sync();
};
*/
