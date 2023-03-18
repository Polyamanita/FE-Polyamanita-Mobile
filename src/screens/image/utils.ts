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

export const convertDateTime = (timestamp: string) => {
  const monthsMap = new Map([
    [0, "Jan"],
    [1, "Feb"],
    [2, "Mar"],
    [3, "Apr"],
    [4, "May"],
    [5, "Jun"],
    [6, "Jul"],
    [7, "Aug"],
    [8, "Sep"],
    [9, "Oct"],
    [10, "Nov"],
    [11, "Dec"],
  ]);

  const daysMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);

  const datetime = new Date(timestamp);

  const day = daysMap.get(datetime.getDay());
  const month = monthsMap.get(datetime.getMonth());
  const date = datetime.getDate();
  const year = datetime.getFullYear();

  let hours = datetime.getHours();
  const ampm = hours < 12 ? "AM" : "PM";
  hours %= 12;
  const minutes = ("0" + datetime.getMinutes()).slice(-2);

  return `${day}, ${month} ${date}, ${year} at ${
    hours % 12
  }:${minutes} ${ampm}`;
};
