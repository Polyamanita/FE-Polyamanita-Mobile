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

interface SignupScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [input2, setInput2] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef(null);

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
          input={input}
          setInput={setInput}
          ref={ref}
          placeholder="Username"
          status=""
        />
        <Input
          input={input2}
          setInput={setInput2}
          ref={ref}
          placeholder="Email"
          status=""
        />
        <Input
          input={input}
          setInput={setInput}
          ref={ref}
          placeholder="Password"
          status=""
        />
        <Input
          input={input}
          setInput={setInput}
          ref={ref}
          placeholder="Confirm Password"
          status=""
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
