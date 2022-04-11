export default {
  INSANE_DATE: 'The date you are trying to schedule is surprinsingly dumber than you.',
  INVALID_PARAMETERS: 'The parameters for this command are invalid. I may \\help you, if I\'m in the mood, which I\'m not.',
  NEW_SESSION: (date: string): string => `I've scheduled a new session for you on ${date}`,
  NO_SESSION_SCHEDULED: 'There doesn\'t seem to be any session scheduled. What a pity 🤭.',
  NEXT_SESSION: (date: string): string => `The next session will be on ${date}, I hope you don't come.`,
  NEXT_WEEKLY_SESSION: (dow: string): string => `There's a weekly session next ${capitalizeFirstLetter(dow)}`,
  TIME_TRAVELER: 'Hey everyone it looks like we\'ve got a time traveler in our midst, scheduling sessions in the past. Or maybe' +
  ' he is just stupid. Who knows?',
  CONSTRAIN_ERROR: (date: string): string => `Sigh. There is already a session scheduled for ${date}`,
  WEEKLY_CONSTRAIN_ERROR: (dow: string): string => `Sigh. There is already a weekly session scheduled on ${capitalizeFirstLetter(dow)}`,
  UNKNOWN_ERROR: 'An unknown error appears to have ocurred. This is most likely your fault',
  SESSION_DELETED: (date: string): string => `I've deleted your session on ${date}. More bad news, what a shocker.`,
  NEW_WEEKLY_SESSION: (dow: string): string => `I've scheduled a new session for you every ${capitalizeFirstLetter(dow)}`
}

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}