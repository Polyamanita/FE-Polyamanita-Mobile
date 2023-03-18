import axios, { AxiosError, AxiosResponse } from "axios";
import { LatLng } from "react-native-maps";
import { GMAPS_API_KEY } from "./constants/secrets";

const instance = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api",
  timeout: 7500,
});

const result = (res: AxiosResponse) => res;
const contentJSON = { "content-type": "application/json" };

const handleError = (err: AxiosError) => {
  if (err.response) {
    return err.response;
  } else if (err.request) {
    return err.request;
  } else {
    return err.message;
  }
};

// Set of general Axios HTTP request functions.
const requests = {
  get: (url: string, params?: unknown) => {
    return instance
      .get(url, { params: params })
      .then(result)
      .catch(handleError);
  },
  post: (url: string, body: unknown, params?: unknown) =>
    instance
      .post(url, body, { params: params, headers: contentJSON })
      .then(result)
      .catch(handleError),
  put: (url: string, body: unknown, params?: unknown) =>
    instance
      .put(url, body, { params: params, headers: contentJSON })
      .then(result)
      .catch(handleError),
  delete: (url: string, params?: unknown) =>
    instance.delete(url, { params: params }).then(result).catch(handleError),
};

export const doGetLocationFromLatlng = (latlng: LatLng) => {
  const route = "/geocode/json";
  const latlngPart = latlng.latitude + "," + latlng.longitude;
  const funy =
    route +
    "?key=" +
    GMAPS_API_KEY +
    "&latlng=" +
    latlngPart +
    "&result_type=locality";

  return requests.get(funy);
};
