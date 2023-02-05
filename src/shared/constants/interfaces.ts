// ? Interfaces

// Check interface is a handler for text input fields. Where:
// a method is provided to return a boolean.
// a feedback message for that specific method.
export interface Check {
  method: (value: string) => boolean;
  feedback: string;
}

// Interface to maintain consistancy when working with input filed components.
export interface InputHandler {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  /* Takes conditionally atleast one method with a string parameter that returns 
       a boolean. */
  checkMethods?: Check[];
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  feedback?: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  ref?: React.MutableRefObject<null>;
  status?: "confirm" | "alert" | "warn";
}

export interface UserData {
  colors: [color1: string, color2: string];
}
