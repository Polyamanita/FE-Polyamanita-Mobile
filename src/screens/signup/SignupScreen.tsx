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
        />
        <Input
          typedText={input2}
          setInput={setInput2}
          ref={reference}
          styling={{ placeholder: "Email" }}
        />
        <Input
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{ placeholder: "Password" }}
        />
        <Input
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{ placeholder: "Confirm password" }}
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
          varient="primary-outline"
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
