import { Captures } from "api/constants/journal";
import { channelNames } from "redux/constants";

export const storeCaptures = (captures: Captures) => {
  return {
    type: channelNames.cacheCaptures,
    captures,
  };
};

export const queueRefetch = () => {
  return {
    type: channelNames.queueRefetch,
  };
};
