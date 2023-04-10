import { doGetCapture, doPostCaptures } from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import { CaptureInstance, Captures, Instance } from "api/constants/journal";
import { UnreadTable } from "redux/constants";
import { unmarkShroomUnread } from "redux/actions/journal-actions";

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

export const useUnmarkUnread = (shroomID: string) => {
  const unreadTable: UnreadTable = useSelector(
    (store: ReduxStore) => store.journalData.unreadTable,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (shroomID in unreadTable) {
      dispatch(unmarkShroomUnread(shroomID));
    }
  }, [dispatch, shroomID, unreadTable]);
};

export const handleUpdateNotes = (
  capture: CaptureInstance,
  newNotes: string,
) => {
  if (capture.notes === newNotes) {
    return;
  }

  const captures: Captures = [
    {
      captureID: capture.captureID,
      instances: [],
      notes: newNotes,
      timesFound: capture.timesFound,
      userID: capture.userID,
    },
  ];

  doPostCaptures(capture.userID, captures)
    .then((resp) => {
      if (resp.status === 200) {
        console.log("notes updated!");
      } else {
        console.log("notes didn't update :(");
      }
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      } else if (err.request) {
        return err.request;
      } else {
        return err.message;
      }
    });
};
