// ? Screens
export const SCREENS = {
  INITIAL: "Initial",
  SIGNIN: "Signin",
  SIGNUP: "Signup",
  CONFIRM: "Confirm",

  MAP: "Map",

  SNAP: "Snap",
  CAPTURE: "Capture",

  JOURNAL: "Journal",

  COMMUNITY: "Community",

  // Just using this here to test the components.
  TEST: "Testing",
  // Home is from boilerplate.
  HOME: "Home",
};

export const ZONES = {
  PREAPP: "PreApp",
  APP: "App",
  EXTRA: "Extra",
};

export interface Check {
  method: (value: string) => boolean;
  feedback: string;
}

// ? Interfaces
export interface InputHandler {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  /* Takes conditionally atleast one method with a string parameter that returns 
     a boolean. */
  checkMethods?: Check[];
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  feedback?: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  ref: React.MutableRefObject<null>;
  status?: "confirm" | "alert" | "warn";
}
