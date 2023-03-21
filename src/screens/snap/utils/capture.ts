// FILE PURPOSE:
// Set of functions that happens when user is capturing a mushroom.
import { Location } from "api/constants/location";
import { doGetLocationFromLatlng } from "api/gmaps-requests";
import { doGetUploadLinkAndS3Key } from "api/requests";
import { AxiosResponse } from "axios";
import Geolocation from "react-native-geolocation-service";

// Get the current position of the user.
// First by getting coords of user from Geolocator library,
// Then do a reverse lookup of the coords to get name of town user is near.
export const getCurrentPosition = () =>
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
        };
        doGetLocationFromLatlng(latlng).then((response: AxiosResponse) => {
          if (response.status === 200) {
            const locationName = response.data.results[0].formatted_address;
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

export const useGetLocation = (latitude: number, longitude: number) => {
  // const [location, setLocation] = useState("hiii");
  // const latlng = { latitude, longitude };

  // doGetLocationFromLatlng(latlng).then((response) => {
  //   console.log(response);
  //   if (response.status === 200) {
  //     // setLocation to something
  //     // CHANGE THIS BEFORE USING !!!!!!!!!!!!!
  //     setLocation("lol");
  //   }
  // });

  // return location;
  new Promise((resolve, reject) => {
    const latlng = { latitude, longitude };
    doGetLocationFromLatlng(latlng).then((response: AxiosResponse) => {
      console.log(response);
      if (response.status === 200) {
        // Perform it here.
        console.log(response);
        resolve(response);
      } else {
        reject();
      }
    });
  });
};

// Make request to get S3 key for image upload.
export const fetchS3Key = (userID: string) =>
  new Promise((resolve, reject) => {
    doGetUploadLinkAndS3Key(userID).then((response: AxiosResponse) => {
      if (response.status === 200) resolve(response.data);
      else reject(response.data);
    });
  });
