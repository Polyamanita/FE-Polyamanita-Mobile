import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthUser, Session } from "./auth";
import { Captures } from "./constants/journal";
import { BEANSTALK_URL } from "./constants/secrets";
import { UpdateUserData } from "./constants/user";

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

// #region API for user signin / reg
export const doRegister = (user: AuthUser): Promise<AxiosResponse> =>
  requests.post("/auth", user);

export const doAuthorize = (registrationDetails: AuthUser) =>
  requests.post("/users", registrationDetails);

export const doSignin = (credentials: Session) =>
  requests.post("/session", credentials);

export const doGetUser = (userID: string) => requests.get("/users/" + userID);

export const doUpdateColor = (
  userID: string,
  colors: [color1: string, color2: string],
) => {
  doGetUser(userID).then((resolve: AxiosResponse) => {
    console.log("Update Color: ", resolve);
    const updateUserData = {
      username: "",
      email: "",
      color1: colors[0],
      color2: colors[1],
    } as UpdateUserData;
    requests.put(`/users/${userID}`, updateUserData);

    return colors;
  });
};
// #endregion

export const doGetCapture = (userID: string, captureID: string) =>
  requests.get("/users/" + userID + "/captures/" + captureID);

// const userID = "some-id";
export const doGetCaptures = (userID: string) =>
  requests.get("/users/" + userID + "/captures");

export const doGetAllCaptures = () => requests.get("/users/captures");

export const doGetUploadLinkAndS3Key = (userID: string) =>
  requests.post("/users/" + userID + "/images", {});

export const doUploadToS3 = (image: any, uploadLink: string) => {
  const s3instance = axios.create({
    baseURL: uploadLink,
    timeout: 7500,
  });
  return s3instance
    .put("", image, { headers: { "content-type": "image/jpg" } })
    .then((res) => res)
    .catch(handleError);
};

// yeesh
export const doUploadImage = (userID: string, image: any) =>
  new Promise((resolve, reject) => {
    doGetUploadLinkAndS3Key(userID)
      .then((response) => {
        if (response.status === 200) {
          const link = response.data.links?.[0];
          const { uploadLink } = link;
          doUploadToS3(image, uploadLink)
            .then((_) => {
              resolve(response);
            })
            .catch(handleError);
        } else {
          reject(response);
        }
      })
      .catch(handleError);
  });

export const doPostCaptures = (userID: string, captures: Captures) =>
  requests.post("/users/" + userID + "/captures", { captures });
