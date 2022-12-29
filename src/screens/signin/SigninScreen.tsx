import React, { useRef, useState } from "react";
import { View } from "react-native";
/**
 * ? Local Imports
 */
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase } from "@react-navigation/native";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const [input, setInput] = useState("");
  const reference = useRef(null);

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
          typedText={input}
          setInput={setInput}
          ref={reference}
          styling={{
            placeholder: "Display name",
          }}
        />
        <Input
          typedText={input}
          setInput={setInput}
          ref={reference}
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
