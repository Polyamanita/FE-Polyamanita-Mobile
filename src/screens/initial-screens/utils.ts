import { AuthUser } from "api/auth";
import { doAuthorize, doRegister } from "api/requests";
import { Check, InputHandler } from "shared/constants/interfaces";

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

// USER REG HANDELING.
export const handleSendEmailConfirmation = async (
  userRegistrationAttempt: AuthUser,
) => {
  // API takes in JSON string.
  return doRegister(JSON.stringify({ email: userRegistrationAttempt.email }));
};

export const confirmConfirmation = (registrationDetails: AuthUser) => {
  doAuthorize(registrationDetails).then((response) => {
    console.log(response);
  });
};
