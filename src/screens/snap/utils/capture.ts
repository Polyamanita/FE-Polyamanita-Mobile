// FILE PURPOSE:
// Set of functions that happens when user is capturing a mushroom.
import Geolocation from "react-native-geolocation-service";

// Get the current position of the user.
export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    const positionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000,
    } as Geolocation.GeoOptions;

    Geolocation.getCurrentPosition(
      (pos) => {
        // console.log(pos);
        resolve(pos);
      },
      (error) => {
        reject(error.message);
      },
      positionOptions,
    );
  });

// Grab info from redux. (dont think this needs to be a promise as we can
// get this info from redux )
export const getUserInfo = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 7500));

// Make request to get S3 key for image upload.
export const fetchS3Key = () =>
  new Promise((resolve) => setTimeout(() => resolve(3), 3000));

export const photoFileTimeToDateTime = (photoTime: string) => {
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

  const dateTimeString = photoTime.split(" ");
  const date = dateTimeString[0].split(":");

  // Now that it's split, lets manipulate to set up UTC string; that works.
  // Convert month number into string.
  date[1] = monthsMap.get(date[1]) as string;

  // <Month> <Day>, <Year> <H:MM:SS>
  const dateString = `${date[1]} ${date[2]}, ${date[0]} ${dateTimeString[1]}`;
  const dateUTC = new Date(dateString).toISOString();

  return dateUTC;
};
