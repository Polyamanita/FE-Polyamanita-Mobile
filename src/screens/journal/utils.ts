import { Captures } from "api/constants/journal";
import { doGetCaptures } from "api/requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";

export const useGetCaptures = () => {
  const [captures, setCaptures] = useState<Captures>();
  const [loading, setLoading] = useState<boolean>(true);
  const userID = useSelector((store: ReduxStore) => store.userData.userID);

  useEffect(() => {
    setLoading(true);
    doGetCaptures(userID).then((result) => {
      if (result.status === 200) {
        setCaptures(result.data.captures);
        setLoading(false);
      }
    });
  }, [userID]);

  return { loading, captures };
};
