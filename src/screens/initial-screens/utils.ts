import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthUser, NewUser, Session } from "api/auth";
import { UserData } from "api/constants/user";
import { doAuthorize, doGetUser, doRegister, doSignin } from "api/requests";
import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  updateUserID,
  updateUserName,
} from "redux/actions/account-actions";
import { Check, InputHandler } from "shared/constants/interfaces";
import { APPSECTIONS } from "shared/constants/navigation-routes";

/* Set of checks to perform on an input field to verify the user has typed 
   has typed in the correct information. */
export const inputCheck = {
  // DISPLAY NAME CHECKS
  onlyLettersAndNumbers: {
    method: (value: string) => /^[A-Za-z0-9]*$/.test(value),
    feedback:
      "Only letters and numbers allowed. No spaces or special characters.",
  } as Check,

  minLengthDisplayName: {
    method: (value: string) => /.{3,}/.test(value),
    feedback: "Display name must be atleast 3 characters long.",
  } as Check,

  // EMAIL CHECKS
  validEmailFormat: {
    method: (value: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
    feedback: "Invalid email address.",
  } as Check,

  // PASSWORD CHECKS
  minLengthPassword: {
    method: (value: string) => /.{5,}/.test(value),
    feedback: "Password must be atleast 5 characters long.",
  } as Check,

  hasAtleastOneCaptial: {
    method: (value: string) => /[A-Z]/.test(value),
    feedback: "Password must contain atleast 1 captial letter.",
  } as Check,

  hasAtleastOneDigit: {
    method: (value: string) => /[0-9]/.test(value),
    feedback: "Password must contain atleast 1 digit.",
  },
};

export const allInputsFulfilled = (inputStatuses: InputHandler["status"][]) => {
  return !inputStatuses.includes("warn") && !inputStatuses.includes("alert");
};

// #region Promise wrappers fror userReg / Signin
export const handleSendEmailConfirmation = (registrationDetails: AuthUser) => {
  return doRegister(registrationDetails);
};

export const confirmConfirmation = (registrationDetails: NewUser) => {
  return doAuthorize(registrationDetails);
};

export const handleSignin = (credentials: Session) => {
  return doSignin(credentials);
};
// #endregion

// Decorator to handle set of signin actions to perform.
export const setupUser = (
  dispatch: Dispatch<AnyAction>,
  response: AxiosResponse,
  navigation: StackNavigationProp<ParamListBase, string>,
) => {
  dispatch(updateUserID(response.data.userID));
  // Now that we have the ID. We can also update; Redux store to contain user info/settings.
  doGetUser(response.data.userID).then((userResponse: AxiosResponse) => {
    // console.log("doGetUser: ", response);
    const userData = userResponse.data.user;
    const userColors = [userData.color1, userData.color2] as [
      color1: string,
      color2: string,
    ];

    const userDataObject: UserData = {
      avatar: {
        colors: userColors,
        iconName: "mushroom", // TODO: forced, would be cool for custom icons later.
      },
      TotalCaputes: userData.TotalCaputes,
      userName: userData.username,
      userID: response.data.userID,
    };

    dispatch(updateUserName(userDataObject.userName));
  });

  // Then navigate user to main app.
  // FIX: for when user reges, goes into main app, then logs out.
  navigation.popToTop();
  navigation.navigate(APPSECTIONS.APP);
};
