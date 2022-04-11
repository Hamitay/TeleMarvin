import { DayOfWeek } from "../models/enum/DayOfWeek";

export default {
  POLL_MESSAGE: (date: string): string => `It seems you have scheduled a session for today ${date}. But at what time?`,
  WEEKLY_POLL_MESSAGE: (dow: DayOfWeek): string => `It seems you have scheduled a session for this ${capitalizeFirstLetter(dow)}. But at what time?`,
}

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}