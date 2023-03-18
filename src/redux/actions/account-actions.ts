import { UserData } from "api/constants/user";
import { channelNames } from "redux/constants";

export const updateUserData = (userData: UserData) => {
  return {
    type: channelNames.updateUserData,
    userData,
  };
};

export const updateUserName = (userName: string) => {
  return {
    type: channelNames.updateUserName,
    userName,
  };
};

export const updateUserID = (userID: string) => {
  return {
    type: channelNames.updateUserID,
    userID,
  };
};
