import { ACTION } from "../actions/actions";
import { UserData } from "shared/constants/interfaces";
import { userColors } from "api/mockUserData";

const initialUserData = {
  colors: {
    color1: "#FF00FF",
    color2: "#00FF00",
  },
} as UserData;

const initialState = {
  userData: initialUserData,
};

export default (state = initialState, action: { [key: string]: string }) => {
  switch (action.type) {
    case ACTION.loadUserData:
      return {
        ...state,
        userData: userColors,
      };
    default:
      return state;
  }
};
