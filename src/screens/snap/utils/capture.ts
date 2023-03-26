// FILE PURPOSE:
// Set of functions that happens when user is capturing a mushroom.
import { CaptureInstance } from "api/constants/journal";
import {
  doGetCapture,
  doGetUploadLinkAndS3Key,
  doPostCaptures,
  doUploadToS3,
} from "api/requests";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { queueRefetch } from "redux/actions/journal-actions";
import { getCurrentPosition } from "utils";

export const getPosition = () => getCurrentPosition();

// Use Redux's user ID and modelData's shroom ID to make a capture ID
export const buildCaptureIDFromShroomalysis = (modelData: unknown) => {
  modelData;
  return "some-other-id";
};

export const getCaptureData = (
  userID: string,
  captureID: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    doGetCapture(userID, captureID).then((result) => {
      if (result.status === 200) {
        resolve(result.data.capture);
      } else {
        reject(result.data);
      }
    });
  });
};

export const stripParamsFromLink = (url: string) => {
  return url.split("?")[0];
};

export const handlePostCapture = (
  userID: string,
  photoPath: string,
  capture: CaptureInstance,
  uploadLink: string,
  dispatch: Dispatch,
) => {
  const imageUri = "file://" + photoPath;

  doUploadToS3(imageUri, uploadLink).then((s3Response) => {
    // console.log("s3 response status", s3Response.status);
    if (s3Response.status === 200) {
      // Post new capture to API, force refetch on journal
      doPostCaptures(userID, [capture]).then(() => dispatch(queueRefetch()));
    }
  });
};

// Make request to get S3 key for image upload.
export const getS3Response = (userID: string) =>
  new Promise((resolve, reject) => {
    doGetUploadLinkAndS3Key(userID).then((response: AxiosResponse) => {
      if (response.status === 200) resolve(response.data);
      else reject(response.data);
    });
  });
