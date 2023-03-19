import React, { useRef, useState } from "react";
/**
 * ? Local Imports
 */
import Input from "@shared-components/input/input";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { InputHandler } from "shared/constants/interfaces";
import { localString } from "shared/localization";
import InputWrapper from "../wrappers/input-wrapper";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import IntialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import {
  allInputsFulfilled,
  handleSignin,
  inputCheck,
  setupUser,
} from "../utils";
import { Session } from "api/auth";
import { useDispatch } from "react-redux";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const reference = useRef(null);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [feedbackPassword, setFeedbackPassword] = useState("");

  const dispatch = useDispatch();

  // TODO: Repetitive code. Create a function to create this?
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
    setStatus: setValidPassword,
    feedback: feedbackPassword,
    setFeedback: setFeedbackPassword,
    ref: reference,
    status: validPassword,
  } as InputHandler;

  return (
    <ScreenContainer>
      <IntialAppWrapper
        title={localString.signin}
        heading={localString.initialStackHeaderMessages.signin}
      >
        <InputWrapper>
          <Input
            inputHandler={emailHandler}
            styling={{
              placeholder: localString.email,
            }}
          />
          <Input
            inputHandler={passwordHandler}
            styling={{ placeholder: localString.password }}
            secureTextEntry={true}
          />
        </InputWrapper>
        <CTAButton
          title={localString.signin}
          onPress={() => {
            // DEV WHATEVER STUFF AUTOSIGNIN
            // if (
            //   !allInputsFulfilled([
            //     emailHandler.status,
            //     passwordHandler.status,
            //   ]) ||
            //   (!email && !password)
            // ) {
            //   // TODO: add demo handler for blank signin, use mock data?
            //   navigation.popToTop();
            //   navigation.push(APPSECTIONS.APP);
            // }

            const credentials: Session = {
              email: email,
              password: password,
            };

            if (
              allInputsFulfilled([emailHandler.status, passwordHandler.status])
            ) {
              handleSignin(credentials).then((result) => {
                console.log(result.status === 200);
                if (result.status === 200) {
                  setupUser(dispatch, result, navigation);
                } else {
                  emailHandler.setStatus("warn");
                  emailHandler.setFeedback("");
                  passwordHandler.setStatus("warn");
                  passwordHandler.setFeedback(
                    localString.initialStackHeaderMessages.incorrectUserPass,
                  );
                }
              });
            }
          }}
        />
        <CancelButton navigation={navigation} />
      </IntialAppWrapper>
    </ScreenContainer>
  );
};

export default SigninScreen;
