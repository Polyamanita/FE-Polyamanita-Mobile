import { channelNames } from "redux/constants";

export const loadUserData = () => {
  return {
    type: channelNames.loadUserData,
  };
};
