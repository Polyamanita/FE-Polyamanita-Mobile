import { channelNames } from "redux/constants";

export const loadUserData = () => {
  return {
    type: channelNames.loadUserData,
  };
};

export const updateUserID = (userID: string) => {
  return {
    type: channelNames.updateUserID,
    userID,
  };
};
