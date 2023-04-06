import { CaptureInstance } from "api/constants/journal";
import { UserData } from "api/constants/user";
import { doGetCaptures } from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCaptures } from "redux/actions/journal-actions";
import { JournalCache } from "redux/constants";
import { ReduxStore } from "redux/store";
import { extractShroomID } from "utils";

export type CaptureMap = {
  [shroomID: string]: CaptureInstance;
};

export const useGetCaptures = () => {
  const [captures, setCaptures] = useState<CaptureMap>({});
  const [loading, setLoading] = useState<boolean>(false);

  const {
    userData: { userID },
    journalData: { captures: cachedCaptures, refetch },
  }: { userData: UserData; journalData: JournalCache } = useSelector(
    (store: ReduxStore) => store,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    // Load from Redux cache, if available
    if (!refetch && cachedCaptures) {
      setCaptures(cachedCaptures);
      setLoading(false);
      return;
    }

    console.log("making getCaptures call");
    doGetCaptures(userID).then((result) => {
      if (result.status === 200) {
        // Create dict of captures
        const newCaptures: CaptureMap = {};
        result.data.captures.forEach((capture: CaptureInstance) => {
          const shroomID = extractShroomID(capture.captureID);
          newCaptures[shroomID] = capture;
        });

        // Cache results
        dispatch(storeCaptures(newCaptures));

        setCaptures(newCaptures);
      }
      setLoading(false);
    });
  }, [cachedCaptures, refetch, userID, dispatch]);

  return { loading, captures };
};
