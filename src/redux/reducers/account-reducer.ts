import { channelNames } from "redux/constants";
import { UserData } from "api/constants/user";
import { userColors, userIconName, userID, userName } from "api/mockUserData";

const initialUserData = {
  avatar: {
    colors: ["#000000", "#FF00FF"],
    iconName: "help",
  },
  username: "NAME_NOTFOUND",
} as UserData;

export default (state = initialUserData, action: { [key: string]: string }) => {
  switch (action.type) {
    case channelNames.loadUserData:
      return {
        ...state,
        avatar: {
          // These are acting as fetching from API
          colors: userColors,
          iconName: userIconName,
        },
        userName: userName,
        userID: userID,
      };
    case channelNames.updateUserID:
      return {
        ...state,
        userID: action.userID,
      };
    default:
      return state;
  }
};
