import React, { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./SigninScreen.style";
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";

interface SigninScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [input, setInput] = useState("");
  const ref = useRef(null);

  return (
    <View style={{ ...styles.container, paddingHorizontal: 15 }}>
      <PreAppHeader title={"Sign In"} />
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
          input={input}
          setInput={setInput}
          ref={ref}
          placeholder="Password"
          status=""
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

export default SigninScreen;
