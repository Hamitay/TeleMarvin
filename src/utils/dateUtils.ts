import { DateTime } from 'luxon';

const STRING_FORMAT = process.env.STRING_FORMAT || 'dd/LL/yy';
const TIMEZONE = process.env.TIMEZONE || 'America/Sao_Paulo';

const WEEK_DAY_MAP = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

function parseStringToDateTime(dateString: string): DateTime {
  return DateTime.fromFormat(dateString, STRING_FORMAT, { zone: TIMEZONE});
}

function parseDateTimeToString(dateTime: DateTime): string {
  return dateTime.toFormat(STRING_FORMAT);
}

function parseSQLDateToString(sqlDateString: string): string {
  return parseDateTimeToString(DateTime.fromSQL(sqlDateString));
}


function getCurrentTime(): DateTime {
  return DateTime.fromObject({zone: TIMEZONE});
}

function isDateInThePast(dateTime: DateTime, overrideNow?: DateTime): boolean {
  const now = overrideNow ? overrideNow : getCurrentTime();
  return dateTime < now;
}

function dateToWeekDay(date: DateTime): string {
  console.log(date.weekday)
  return WEEK_DAY_MAP[date.weekday - 1];
}

export {
  parseDateTimeToString,
  parseSQLDateToString,
  parseStringToDateTime,
  isDateInThePast,
  getCurrentTime,
  dateToWeekDay,
};
