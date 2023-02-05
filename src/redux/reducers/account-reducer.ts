import { channelNames } from "redux/constants";
import { UserData } from "shared/constants/interfaces";
import { userColors, userIconName } from "api/mockUserData";

const initialUserData = {
  avatar: {
    colors: ["#000000", "#FF00FF"],
    iconName: "help",
  },
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
      };
    default:
      return state;
  }
};
