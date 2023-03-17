import React, { useRef, useState } from "react";
/**
 * ? Local Imports
 */
import Input from "@shared-components/input/input";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { InputHandler } from "shared/constants/interfaces";
import { APPSECTIONS } from "shared/constants/navigation-routes";
import { localString } from "shared/localization";
import InputWrapper from "../wrappers/input-wrapper";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import IntialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { allInputsFulfilled, handleSignin } from "../utils";
import { Session } from "api/auth";
import { useDispatch } from "react-redux";
import { updateUserID } from "redux/actions/account-actions";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const reference = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState("");

  const dispatch = useDispatch();

  // TODO: Repetitive code. Create a function to create this?
  const emailHandler = {
    input: email,
    setInput: setEmail,
    ref: reference,
  } as InputHandler;

  const passwordHandler = {
    input: password,
    setInput: setPassword,
    setStatus: setValidPassword,
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
            if (
              !allInputsFulfilled([
                emailHandler.status,
                passwordHandler.status,
              ]) ||
              (!email && !password)
            ) {
              // TODO: add demo handler for blank signin, use mock data?
              navigation.popToTop();
              navigation.push(APPSECTIONS.APP);
            }

            const credentials: Session = {
              email: email,
              password: password,
            };

            const sessionCredJSON = JSON.stringify(credentials);

            handleSignin(sessionCredJSON).then((result) => {
              if (result.status === 200) {
                // Update user ID in Redux store
                dispatch(updateUserID(result.userID));

                // TODO: handle session token?

                navigation.popToTop();
                navigation.push(APPSECTIONS.APP);
              } else {
                console.log;
              }
            });

            // else
            /* display message below password input why didnt work.
        invalid credientials, failed to reach server, etc.
        put this message by using the password message prop */
          }}
        />
        <CancelButton navigation={navigation} />
      </IntialAppWrapper>
    </ScreenContainer>
  );
};

export default SigninScreen;
