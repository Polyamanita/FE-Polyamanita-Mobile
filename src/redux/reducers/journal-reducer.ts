import { JournalCache, channelNames } from "redux/constants";

const initialJournalData = {
  captures: undefined,
  refetch: true,
  unreadTable: {},
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
    case channelNames.markShroomUnread:
      // Add shroomID to unread set
      // jesus
      if (state.captures) {
        return {
          ...state,
          captures: {
            ...state.captures,
            ...{
              [action.shroomID]: {
                ...state.captures[action.shroomID],
                isUnread: true,
              },
            },
          },
          unreadTable: { ...state.unreadTable, ...{ [action.shroomID]: true } },
        };
      } else {
        return {
          ...state,
          unreadTable: { ...state.unreadTable, ...{ [action.shroomID]: true } },
        };
      }
    case channelNames.unmarkShroomUnread: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.shroomID]: unmarkedShroom, ...updatedUnreadTable } =
        state.unreadTable;
      // jesus
      if (state.captures) {
        return {
          ...state,
          captures: {
            ...state.captures,
            [action.shroomID]: state.captures && {
              ...state.captures[action.shroomID],
              isUnread: false,
            },
          },
          unreadTable: updatedUnreadTable,
        };
      } else {
        return {
          ...state,
          unreadTable: updatedUnreadTable,
        };
      }
    }
    default:
      return state;
  }
};
