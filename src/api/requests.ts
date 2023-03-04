import axios, { AxiosError, AxiosResponse } from "axios";
import { BEANSTALK_URL } from "./constants/secrets";

const instance = axios.create({
  baseURL: BEANSTALK_URL,
  timeout: 7500,
});

const result = (res: AxiosResponse) => res.data;
const contentJSON = { "content-type": "application/json" };

const handleError = (err: AxiosError) => {
  if (err.response) {
    // This is the return where if a username/email has been already taken.
    return err["request"]["_response"];
  } else if (err.request) {
    console.log("No Response:", err.request);
  } else {
    console.log("Request setup failed: ", err.message);
  }
};

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
export const doRegister = (
  email: string,
): Promise<{ codeExpiration: string }> => requests.post("/auths", email);
