import React, { useRef, useState } from "react";
import { View } from "react-native";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { ParamListBase } from "@react-navigation/native";
import { InputHandler } from "shared/constants/models";
import { SCREENSTACK } from "@shared-constants";

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
      <PreAppHeader title={"Sign In"} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Input
          inputHandler={displayNameHandler}
          styling={{
            placeholder: "Display name",
          }}
        />
        <Input
          inputHandler={passwordHandler}
          styling={{
            placeholder: "Password",
          }}
        />
      </View>
      <>
        <Button
          title="Sign In"
          varient="primary"
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
          size="large"
        />
        <Button
          title="Cancel"
          onPress={() => {
            navigation.popToTop();
          }}
          size="small"
        />
      </>
    </ScreenContainer>
  );
};

export default SigninScreen;
