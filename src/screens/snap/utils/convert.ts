// Some odd reason, the PhotoFile metadata has a saved string of:
// 20XX:12:31 23:59:59
// Lets convert it to a readable Date object.

const monthsMap = new Map([
  ["01", "January"],
  ["02", "February"],
  ["03", "March"],
  ["04", "April"],
  ["05", "May"],
  ["06", "June"],
  ["07", "July"],
  ["08", "August"],
  ["09", "September"],
  ["10", "October"],
  ["11", "November"],
  ["12", "December"],
]);

export const photoFileTimeToDateTime = (photoTime: string) => {
  const dateTimeString = photoTime.split(" ");
  const date = dateTimeString[0].split(":");

  // Now that it's split, lets manipulate to set up UTC string; that works.
  console.log(date);
  // Convert month number into string.
  date[1] = monthsMap.get(date[1]) as string;

  // <Month> <Day>, <Year> <H:MM:SS>
  const dateString = `${date[1]} ${date[2]}, ${date[0]} ${dateTimeString[1]}`;
  const dateUTC = new Date(dateString).toUTCString();
  console.log(dateUTC);

  return dateUTC;
};
