export default {
  INSANE_DATE: "The date you are trying to schedule is surprinsingly dumber than you.",
  INVALID_PARAMETERS: "The parameters for this command are invalid. I may \help you, if I'm in the mood, which I'm not.",
  NEW_SESSION: (date: string, time: string) => `I've scheduled a new session for you on ${date} @ ${time}.`,
  NO_SESSION_SCHEDULED: "There doesn't seem to be any session scheduled. What a pity 🤭.",
  NEXT_SESSION: (date: string, time: string) => `The next session will be on ${date} at ${time}, I hope you don't come.`,
  TIME_TRAVELER: "Hey everyone it looks like we've got a time traveler in our midst, scheduling sessions in the past. Or maybe" +
  " he is just stupid. Who knows?"
}
