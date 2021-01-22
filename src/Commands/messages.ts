export default {
  INSANE_DATE: "The date you are trying to schedule is surprinsigly dumber than you.",
  INVALID_PARAMETERS: "The parameters for this command are invalid. I may \help you, if I'm in the mood, which I'm not",
  NEW_SESSION: (date: string, time: string) => `I've scheduled a new session for you on:  ${date} @ ${time};`
}
