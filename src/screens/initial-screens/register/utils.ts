import { doRegister } from "api/requests";

export const sendEmailConfirmation = (email: string) => {
  doRegister(email).then((response) => {
    console.log("send email confirm: ", response);
  });
};
