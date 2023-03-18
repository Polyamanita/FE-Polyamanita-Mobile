import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthUser, NewUser, Session } from "api/auth";
import { doAuthorize, doGetUser, doRegister, doSignin } from "api/requests";
import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  updateUserColors,
  updateUserIcon,
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

// #region

// Starts as HSL -> RGB -> HEX.
// https://css-tricks.com/converting-color-spaces-in-javascript/
const hsl2hex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  let rStr = Math.round((r + m) * 255).toString(16);
  let gStr = Math.round((g + m) * 255).toString(16);
  let bStr = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (rStr.length == 1) rStr = "0" + r.toString();
  if (gStr.length == 1) gStr = "0" + g.toString();
  if (bStr.length == 1) bStr = "0" + b.toString();

  return "#" + rStr + gStr + bStr;
};
// Private method to create 2 random HSL colors, and convert them to HEX for new user avatars.
const createColors = (): [color1: string, color2: string] => {
  const H_MIN = 0;
  const H_MAX = 360;
  const S_MIN = 40;
  const L_MIN = 40;
  const S_MAX = 60;
  const L_MAX = 60;

  const randomNumberInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const color1 = [
    randomNumberInRange(H_MIN, H_MAX),
    randomNumberInRange(S_MIN, S_MAX),
    randomNumberInRange(L_MIN, L_MAX),
  ];

  const color2 = [
    randomNumberInRange(H_MIN, H_MAX),
    randomNumberInRange(S_MIN, S_MAX),
    randomNumberInRange(L_MIN, L_MAX),
  ];

  return [
    hsl2hex(color1[0], color1[1], color1[2]),
    hsl2hex(color2[0], color2[1], color2[2]),
  ];
};

// #endregion

// Decorator to handle set of signin actions to perform.
export function setupUser(
  dispatch: Dispatch<AnyAction>,
  response: AxiosResponse,
  navigation: StackNavigationProp<ParamListBase, string>,
  newUser = false,
) {
  let newColors: [color1: string, color2: string];
  if (newUser) newColors = createColors();

  // Now that we have the ID. We can also update; Redux store to contain user info/settings.
  doGetUser(response.data.userID).then((userResponse: AxiosResponse) => {
    // console.log("doGetUser: ", response);
    const userData = userResponse.data.user;

    // Sorry, was having problems making one dispatch as an object; SKILL ISSUE.
    dispatch(updateUserID(response.data.userID));
    dispatch(updateUserName(userData.username));
    dispatch(updateUserIcon()); // default.
    dispatch(
      updateUserColors(
        !newUser ? [userData.color1, userData.color2] : newColors,
      ),
    );
  });

  // Then navigate user to main app.
  // FIX: for when user reges, goes into main app, then logs out.
  navigation.popToTop();
  navigation.navigate(APPSECTIONS.APP);
}
