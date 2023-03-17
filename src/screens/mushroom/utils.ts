import { doGetCapture } from "api/requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import { CaptureInstance, Instance } from "api/constants/journal";

// Currently unused
export const useGetCaptureData = (captureID: string) => {
  const [capture, setCapture] = useState<CaptureInstance>();
  const [loading, setLoading] = useState<boolean>(true);
  const userID = useSelector((store: ReduxStore) => store.userData.userID);

  useEffect(() => {
    doGetCapture(userID, captureID).then((result) => {
      setLoading(true);
      if (result.status === 200) {
        setCapture(result.data.capture);
        setLoading(false);
      }
    });
  }, [userID, captureID]);

  return { loading, capture };
};

export const useGetInstances = (captureID: string) => {
  const [instances, setInstances] = useState<Instance[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const userID = useSelector((store: ReduxStore) => store.userData.userID);

  useEffect(() => {
    doGetCapture(userID, captureID).then((result) => {
      setLoading(true);
      if (result.status === 200) {
        setInstances(result.data.capture?.instances);
        setLoading(false);
      }
    });
  }, [userID, captureID]);

  return { loading, instances };
};
