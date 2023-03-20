// FILE PURPOSE:
// Set of functions that happens when user is capturing a mushroom.
import { doGetLocationFromLatlng } from "api/gmaps-requests";
import { useState } from "react";
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

export const useGetLocation = (latitude: number, longitude: number) => {
  const [location, setLocation] = useState("hiii");
  const latlng = { latitude, longitude };

  doGetLocationFromLatlng(latlng).then((response) => {
    console.log(response);
    if (response.status === 200) {
      // setLocation to something
      // CHANGE THIS BEFORE USING !!!!!!!!!!!!!
      setLocation("lol");
    }
  });

  return location;
};

// Grab info from redux. (dont think this needs to be a promise as we can
// get this info from redux )
export const getUserInfo = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 7500));

// Make request to get S3 key for image upload.
export const fetchS3Key = () =>
  new Promise((resolve) => setTimeout(() => resolve(3), 3000));

