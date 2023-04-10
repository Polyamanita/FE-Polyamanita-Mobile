import { CaptureMap } from "@screens/journal/utils";

export const channelNames = {
  loadUserData: "LOAD_USERDATA",

  updateUserID: "UPDATE_USERID",
  updateUserName: "UPDATE_USERNAME",
  updateUserColors: "UPDATE_USERCOLORS",
  updateUserIcon: "UPDATE_USERICON",
  updateUserTotalCaptures: "UPDATE_USERCAPTURES",
  incrementUserTotalCaptures: "INCREMENT_USERCAPTURES",

  cacheCaptures: "CACHE_USERCAPTURES",
  queueRefetch: "QUEUE_REFETCH",
  markShroomUnread: "MARK_SHROOM_UNREAD",
  unmarkShroomUnread: "UNMARK_SHROOM_UNREAD",
};

export type UnreadTable = {
  [shroomID: string]: boolean;
};

export interface JournalCache {
  captures: CaptureMap | undefined;
  refetch: boolean;
  unreadTable: UnreadTable;
}
