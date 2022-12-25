import React, { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./SignupScreen.style";
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";

interface SignupScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [input2, setInput2] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef(null);

  return (
    <View style={{ ...styles.container, paddingHorizontal: 15 }}>
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
    </View>
  );
};

export default SignupScreen;
