const { Sequelize, DataTypes, Op } = require('sequelize');

const WEEKDAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'tele_marvin.database',
});

const Session = sequelize.define('Session', {
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
});

const RecurringSession = sequelize.define('RecurringSession', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  weekday: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

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

const addSession = async (groupId, day, month, year, time) => {
  const date = new Date(year, month - 1, day, 23, 59, 59, 0);
  await Session.create({
    date,
    time,
    groupId,
  });
};

const addRecurringSession = async (groupId, weekday) => {
  await RecurringSession.create({
    weekday: WEEKDAYS[weekday],
    groupId,
  });
};

const getNextSessionByGroupId = async (groupId) => {
  const now = new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
  });
  const sessions = await Session.findAll({
    where: {
      [Op.and]: [{ groupId }, { date: { [Op.gte]: now } }],
    },
    order: [['date', 'ASC']],
  });

  if (sessions && sessions.length > 0) {
    const nextSession = await sessions[0].dataValues;
    return nextSession;
  }

  return undefined
};

const getTodayCurrentSession = async () => {
  const now = new Date();

  const sessions = await RecurringSession.findAll({
    where: {
      weekday: now.getDay(),
    }
  });
  return await sessions;
}

module.exports = {
  init,
  addSession,
  getNextSessionByGroupId,
  addRecurringSession,
  getTodayCurrentSession,
};
