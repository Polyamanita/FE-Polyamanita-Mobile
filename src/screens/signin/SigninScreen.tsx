import React, { useRef, useState } from "react";
import { View } from "react-native";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { InputHandler, ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase } from "@react-navigation/native";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
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
            navigation.popToTop();
            navigation.navigate(ZONES.APP, {});
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
