import React, { useRef, useState } from "react";
import { View } from "react-native";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase } from "@react-navigation/native";

interface SignupScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [input2, setInput2] = useState("");
  const [input, setInput] = useState("");
  const reference = useRef(null);

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
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{
            placeholder: "Display name",
          }}
          autoComplete={"username"}
          textContentType={"username"}
        />
        <Input
          typedText={input2}
          setInput={setInput2}
          ref={reference}
          styling={{ placeholder: "Email" }}
          autoComplete={"email"}
          keyboardType={"email-address"}
          textContentType={"emailAddress"}
        />
        <Input
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{ placeholder: "Password" }}
          autoComplete={"password"}
          textContentType={"password"}
          secureTextEntry={true}
        />
        <Input
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{ placeholder: "Confirm password" }}
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
