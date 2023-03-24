import { Captures, JournalCache } from "api/constants/journal";
import { doGetCaptures } from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCaptures } from "redux/actions/journal-actions";
import { ReduxStore } from "redux/store";

export const useGetCaptures = () => {
  const [captures, setCaptures] = useState<Captures>();
  const [loading, setLoading] = useState<boolean>(true);

  const userID: string = useSelector(
    (store: ReduxStore) => store.userData.userID,
  );
  const { captures: cachedCaptures, refetch }: JournalCache = useSelector(
    (store: ReduxStore) => store.journalData,
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
        setCaptures(result.data.captures);
        dispatch(storeCaptures(result.data.captures));
        setLoading(false);
      }
    });
  }, [cachedCaptures, refetch, userID, dispatch]);

  return { loading, captures };
};
