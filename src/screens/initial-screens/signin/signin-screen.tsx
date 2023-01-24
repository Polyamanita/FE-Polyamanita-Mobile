import React, { useRef, useState } from "react";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { InputHandler } from "shared/constants/models";
import { SCREENSTACK } from "@shared-constants";
import { localString } from "shared/localization";
import InputWrapper from "../wrappers/input-wrapper";
import CTAButton from "../components/cta-button";
import CancelButton from "../components/cancel-button";
import IntialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

function handleSignIn() {
  // magic.
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const reference = useRef(null);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState("");

  // TODO: Repetitive code. Create a function to create this?
  const displayNameHandler = {
    input: displayName,
    setInput: setDisplayName,
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
            inputHandler={displayNameHandler}
            styling={{
              placeholder: localString.username,
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
            // handle sign in here.
            // if valid, then
            handleSignIn();
            navigation.popToTop();
            navigation.navigate(SCREENSTACK.APP);

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
