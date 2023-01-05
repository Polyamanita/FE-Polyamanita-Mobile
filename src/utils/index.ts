import { Check } from "@shared-constants";

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const validChecks = {
  onlyLettersAndNumbers: {
    method: (value: string) => /^[A-Za-z0-9]*$/.test(value),
    feedback:
      "Only letters and numbers allowed. No spaces or special characters.",
  } as Check,

  validEmailFormat: {
    method: (value: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
    feedback: "Invalid email address.",
  } as Check,

  minLength: {
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
