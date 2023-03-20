import { channelNames } from "redux/constants";
import { UserData } from "api/constants/user";

const initialUserData = {
  colors: ["#000000", "#FF00FF"],
  iconName: "help",
  userName: "NAME_NOTFOUND",
  userID: "NOT_A_ID",
  TotalCaptures: -1,
} as UserData;

export default (state = initialUserData, action: { [key: string]: string }) => {
  switch (action.type) {
    case channelNames.loadUserData:
      return {
        ...state,
        colors: state.colors,
        iconName: state.iconName,
        userName: state.userName,
        userID: state.userID,
        TotalCaptures: state.TotalCaptures,
      };
    case channelNames.updateUserID:
      return {
        ...state,
        userID: action.userID,
      };
    case channelNames.updateUserName:
      return {
        ...state,
        userName: action.userName,
      };
    case channelNames.updateUserColors:
      return {
        ...state,
        colors: action.colors,
      };
    case channelNames.updateUserIcon:
      return {
        ...state,
        iconName: action.iconName,
      };
    case channelNames.updateUserTotalCaptures:
      return {
        ...state,
        TotalCaptures: action.TotalCaptures,
      };
    default:
      return state;
  }
};
