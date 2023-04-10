import { CaptureMap } from "@screens/journal/utils";
import { channelNames } from "redux/constants";

export const storeCaptures = (captures: CaptureMap) => {
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

export const markShroomUnread = (shroomID: string) => {
  return {
    type: channelNames.markShroomUnread,
    shroomID,
  };
};

export const unmarkShroomUnread = (shroomID: string) => {
  return {
    type: channelNames.unmarkShroomUnread,
    shroomID,
  };
};
