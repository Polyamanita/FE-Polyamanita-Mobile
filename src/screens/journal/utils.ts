import { CaptureInstance, JournalCache } from "api/constants/journal";
import { doGetCaptures } from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { storeCaptures } from "redux/actions/journal-actions";
import { ReduxStore } from "redux/store";
import { extractShroomID } from "utils";

export type CaptureMap = {
  [shroomID: string]: CaptureInstance;
};

export const useGetCaptures = () => {
  const [captures, setCaptures] = useState<{
    [shroomID: string]: CaptureInstance;
  }>();
  const [loading, setLoading] = useState<boolean>(false);

  const userID: string = useSelector(
    (store: ReduxStore) => store.userData.userID,
  );
  const { captures: cachedCaptures, refetch }: JournalCache = useSelector(
    (store: ReduxStore) => store.journalData,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true);

    // Load from Redux cache, if available
    // if (!refetch && cachedCaptures) {
    //   setCaptures(cachedCaptures);
    //   setLoading(false);
    //   return;
    // }

    console.log("making getCaptures call");
    doGetCaptures(userID).then((result) => {
      if (result.status === 200) {
        // dispatch(storeCaptures(result.data.captures));

        // Create dict of captures
        result.data.captures.forEach((capture: CaptureInstance) => {
          const shroomID = extractShroomID(capture.captureID);
          const updatedValue: any = {};
          updatedValue[shroomID] = capture;
          setCaptures((c: any) => ({ ...c, ...updatedValue }));
        });

        setLoading(false);
      }
    });
  }, [cachedCaptures, refetch, userID, dispatch]);

  return { loading, captures };
};
