import { ACTION } from "../actions/account-actions";
import { UserData } from "shared/constants/interfaces";
import { userColors } from "api/mockUserData";

const initialUserData = {
  colors: ["#FF00FF", "#00FF00"],
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
