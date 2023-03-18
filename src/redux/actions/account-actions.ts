import { UserData } from "api/constants/user";
import { channelNames } from "redux/constants";

export const loadUserData = (userData: UserData) => {
  return {
    type: channelNames.loadUserData,
    userData,
  };
};

export const updateUserID = (userID: string) => {
  return {
    type: channelNames.updateUserID,
    userID,
  };
};

export const updateUserName = (userName: string) => {
  return {
    type: channelNames.updateUserName,
    userName,
  };
};

export const updateUserColors = (colors: [color1: string, color2: string]) => {
  return {
    type: channelNames.updateUserColors,
    colors,
  }
}

export const updateUserIcon = (iconName = "mushroom") => {
  return {
    type: channelNames.updateUserIcon,
    iconName,
  }
}
