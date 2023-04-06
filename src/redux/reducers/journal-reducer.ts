import { JournalCache, channelNames } from "redux/constants";

const initialJournalData = {
  captures: undefined,
  refetch: true,
} as JournalCache;

export default (
  state = initialJournalData,
  action: { [key: string]: string },
) => {
  switch (action.type) {
    case channelNames.cacheCaptures:
      return {
        ...state,
        captures: action.captures,
        // Once stored, don't refetch until new capture(s)
        refetch: false,
      };
    case channelNames.queueRefetch:
      return {
        ...state,
        refetch: true,
      };
    default:
      return state;
  }
};
