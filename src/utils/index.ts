import { Location } from "api/constants/location";
import { doGetLocationFromLatlng } from "api/gmaps-requests";
import { AxiosResponse } from "axios";
import Geolocation from "react-native-geolocation-service";

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const capitalizeWords = (string: string) => {
  let splitStr = string.split(" ");
  splitStr = splitStr.map((e) => capitalizeFirstLetter(e));
  return splitStr.join(" ");
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// TODO: do this once shroom IDs are figured out-ish
export const extractShroomID = (captureID: string): string => {
  // const extractedID = "idk" + captureID.substring(0, 0);
  const extractedID = captureID;
  return extractedID;
};

// Get the current position of the user.
// First by getting coords of user from Geolocator library,
// Then do a reverse lookup of the coords to get name of town user is near.
export const getCurrentPosition = (justTheCoords = false) =>
  new Promise((resolve, reject) => {
    const positionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000,
    } as Geolocation.GeoOptions;

    Geolocation.getCurrentPosition(
      (pos) => {
        const latlng = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        } as Location;

        // If we just want the coords, let the promise resolve here.
        if (justTheCoords) {
          resolve(latlng);
        }

        doGetLocationFromLatlng(latlng).then((response: AxiosResponse) => {
          if (response.status === 200) {
            const locationCode = response.data.plus_code
              .compound_code as string;
            const locationName = locationCode.substring(
              locationCode.indexOf(" ") + 1,
            ); // Funky Town, FL, USA
            // const locationName = response.data.results[0].formatted_address;
            resolve({ ...latlng, location: locationName } as Location);
          } else {
            reject(response.data);
          }
        });
      },
      // Error for Geolocation Library.
      (error) => {
        reject(error.message);
      },
      positionOptions,
    );
  });
