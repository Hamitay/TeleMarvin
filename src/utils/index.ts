export const getBrazilianCurrentTime =
  () : Date => new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));

export const convertDateStringToBrazilianDateString = (date: string) => {
  const dateParts = date.split("-");
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}
