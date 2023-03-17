import { doGetUser } from "api/requests";
import { useState } from "react";

export const useGetUsername = (userID: string) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  doGetUser(userID).then((userResult) => {
    if (userResult.status === 200) {
      setUsername(userResult.data.user?.username);
      setLoading(false);
    } else {
      // console.log(result);
    }
  });

  return { loading, username };
};
