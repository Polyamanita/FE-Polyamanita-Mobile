import React, { useRef, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
/**
 * ? Local Imports
 */
import Input from "@shared-components/input/input";
import { SCREENS } from "shared/constants/navigation-routes";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { InputHandler } from "shared/constants/interfaces";
import { localString } from "shared/localization";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import IntialAppWrapper from "../wrappers/initial-app-wrapper";
import InputWrapper from "../wrappers/input-wrapper";
import {
  allInputsFulfilled,
  handleSendEmailConfirmation,
  inputCheck,
} from "../utils";
import { AuthUser } from "api/auth";

interface RegisterScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const reference = useRef(null);
  // Input states
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Status states for each input.
  // 'confirm' true, 'warn' fasle
  const [validDisplayName, setValidDisplayName] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");

  // Message feedbacks
  const [feedbackDisplayName, setFeedbackDisplayName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackPassword, setFeedbackPassword] = useState("");

  // TODO: Repetitive code. Create a function to create this?
  const displayNameHandler = {
    input: displayName,
    setInput: setDisplayName,
    checkMethods: [
      inputCheck.onlyLettersAndNumbers,
      inputCheck.minLengthDisplayName,
    ],
    setStatus: setValidDisplayName,
    feedback: feedbackDisplayName,
    setFeedback: setFeedbackDisplayName,
    ref: reference,
    status: validDisplayName,
  } as InputHandler;

  const emailHandler = {
    input: email,
    setInput: setEmail,
    checkMethods: [inputCheck.validEmailFormat],
    setStatus: setValidEmail,
    feedback: feedbackEmail,
    setFeedback: setFeedbackEmail,
    ref: reference,
    status: validEmail,
  } as InputHandler;

  const passwordHandler = {
    input: password,
    setInput: setPassword,
    checkMethods: [
      inputCheck.minLengthPassword,
      inputCheck.hasAtleastOneCaptial,
      inputCheck.hasAtleastOneDigit,
    ],
    setStatus: setValidPassword,
    feedback: feedbackPassword,
    setFeedback: setFeedbackPassword,
    ref: reference,
    status: validPassword,
  } as InputHandler;

  return (
    <ScreenContainer>
      <IntialAppWrapper
        title={localString.register}
        heading={localString.initialStackHeaderMessages.register}
      >
        <InputWrapper>
          <Input
            inputHandler={displayNameHandler}
            styling={{ placeholder: localString.username }}
            autoComplete={"username"}
            textContentType={"username"}
          />
          <Input
            inputHandler={emailHandler}
            styling={{ placeholder: localString.email }}
            autoComplete={"email"}
            keyboardType={"email-address"}
            textContentType={"emailAddress"}
          />
          <Input
            inputHandler={passwordHandler}
            styling={{ placeholder: localString.password }}
            autoComplete={"password"}
            textContentType={"password"}
            secureTextEntry={true}
          />
        </InputWrapper>
        <CTAButton
          title={localString.register}
          onPress={() => {
            // If all the status are "confirm", then:
            if (
              allInputsFulfilled([
                displayNameHandler.status,
                emailHandler.status,
                passwordHandler.status,
              ])
            ) {
              const userAuth: AuthUser = {
                username: displayName,
                email: email,
                password: password,
              };

              handleSendEmailConfirmation(userAuth).then(
                // Future reader. A 200 resolve and 400-500 error will be a result.
                (result) => {
                  console.log(result.data);
                  if (result.status === 200) {
                    console.log(result);
                    navigation.navigate(SCREENS.CONFIRM, userAuth);
                  } else if (result.status === 400) {
                    // TODO: For now, this message is a combined or statmenet.
                    // API needs to update to seperate checks.
                    emailHandler.setStatus("warn");
                    emailHandler.setFeedback(result.data["response"]);

                    displayNameHandler.setStatus("warn");
                    displayNameHandler.setFeedback(result.data["response"]);
                  } else {
                    console.log(result.data);
                  }
                },
              );
            }
          }}
        />
        <CancelButton navigation={navigation} />
      </IntialAppWrapper>
    </ScreenContainer>
  );
};

export default RegisterScreen;
