export const getBrazilianCurrentTime =
  () : Date => new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));

export const convertDateToBrazilianDateString = (date: Date) => date.toLocaleString("pt-BR");
