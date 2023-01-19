import React, { useRef, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import { SCREENS } from "@shared-constants";
import ScreenContainer from "shared/wrapper/screen-wrapper/screen-wrapper";
import IntialAppWrapper from "@shared-wrapper/initial-wrappers/initial-app-wrapper";
import { capitalizeWords, validChecks } from "utils";
import { InputHandler } from "shared/constants/models";
import { localString } from "shared/localization";
import InputWrapper from "@shared-wrapper/initial-wrappers/input-wrapper";
import CTAButton from "../components/cta-button";
import CancelButton from "../components/cancel-button";

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
    checkMethods: [validChecks.onlyLettersAndNumbers],
    setStatus: setValidDisplayName,
    feedback: feedbackDisplayName,
    setFeedback: setFeedbackDisplayName,
    ref: reference,
    status: validDisplayName,
  } as InputHandler;

  const emailHandler = {
    input: email,
    setInput: setEmail,
    checkMethods: [validChecks.validEmailFormat],
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
      validChecks.minLength,
      validChecks.hasAtleastOneCaptial,
      validChecks.hasAtleastOneDigit,
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
        title={capitalizeWords(localString.register)}
        heading={localString.initialStackHeaderMessages.register}
      >
        <InputWrapper>
          <Input
            inputHandler={displayNameHandler}
            styling={{ placeholder: "Display name" }}
            autoComplete={"username"}
            textContentType={"username"}
          />
          <Input
            inputHandler={emailHandler}
            styling={{ placeholder: "Email" }}
            autoComplete={"email"}
            keyboardType={"email-address"}
            textContentType={"emailAddress"}
          />
          <Input
            inputHandler={passwordHandler}
            styling={{ placeholder: "Password" }}
            autoComplete={"password"}
            textContentType={"password"}
            secureTextEntry={true}
          />
        </InputWrapper>
        <CTAButton
          title={localString.register}
          onPress={() => {
            // Set of actions to perform when register is clicked.
            navigation.navigate(SCREENS.CONFIRM);
          }}
        />
        <CancelButton navigation={navigation} />
      </IntialAppWrapper>
    </ScreenContainer>
  );
};

export default RegisterScreen;
