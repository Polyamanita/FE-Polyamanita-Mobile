import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthUser, Session } from "./auth";
import { BEANSTALK_URL } from "./constants/secrets";

const instance = axios.create({
  baseURL: BEANSTALK_URL,
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

// Send user an email confirmation.
export const doRegister = (user: AuthUser): Promise<AxiosResponse> =>
  requests.post("/auth", user);

export const doAuthorize = (registrationDetails: AuthUser) =>
  requests.post("/users", registrationDetails);

export const doGetCapture = (userID: string, captureID: string) =>
  requests.get("/users/" + userID + "/captures/" + captureID);

// const userID = "some-id";
export const doGetCaptures = (userID: string) =>
  requests.get("/users/" + userID + "/captures");

export const doSignin = (credentials: Session) =>
  requests.post("/session", credentials);

export const doGetAllCaptures = () => requests.get("/users/captures");
