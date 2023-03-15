import { doGetCapture } from "api/requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import { CaptureInstance } from "api/constants/journal";

export const useGetCaptureData = (captureID: string) => {
  const [capture, setCapture] = useState<CaptureInstance>();
  const userID = useSelector((store: ReduxStore) => store.userData.userID);

  useEffect(() => {
    doGetCapture(userID, captureID).then((result) => {
      console.log(userID, captureID);
      if (result.status === 200) {
        setCapture(result.data.capture);
      }
    });
  }, [userID, captureID]);

  return capture;
};
