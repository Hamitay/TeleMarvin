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


const addRecurringSession = async (groupId, weekday) => {
  await RecurringSession.create({
    weekday: WEEKDAYS[weekday],
    groupId,
  });
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
