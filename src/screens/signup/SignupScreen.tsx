import React, { useRef, useState } from "react";
import { View } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS, InputHandler } from "@shared-constants";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { regexMethods } from "utils";

interface SignupScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
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

  // TODO: Repetitive code. Create a function to create this?
  const displayNameHandler = {
    input: displayName,
    setInput: setDisplayName,
    checkMethods: [regexMethods.onlyLettersAndNumbers],
    setStatus: setValidDisplayName,
    ref: reference,
    status: validDisplayName,
  } as InputHandler;

  const emailHandler = {
    input: email,
    setInput: setEmail,
    checkMethods: [regexMethods.validEmailFormat],
    setStatus: setValidEmail,
    ref: reference,
    status: validEmail,
  } as InputHandler;

  const passwordHandler = {
    input: password,
    setInput: setPassword,
    checkMethods: [regexMethods.onlyLettersAndNumbers],
    setStatus: setValidPassword,
    ref: reference,
    status: validPassword,
  } as InputHandler;

  return (
    <ScreenContainer>
      <PreAppHeader title={"Sign Up"} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
      </View>
      <>
        <Button
          title="Sign Up"
          varient="primary"
          onPress={() => {
            navigation.navigate(SCREENS.CONFIRM, {});
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

export default SignupScreen;
