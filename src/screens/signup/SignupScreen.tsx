import React, { useMemo, useRef, useState } from "react";
import { Image, View } from "react-native";
import { NavigationProp, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./SignupScreen.style";
import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const SignupScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [input2, setInput2] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef(null);

  return (
    <View style={{ ...styles.container, paddingHorizontal: 15 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@assets/logo.jpg")}
          style={{ width: 196, height: 196 }}
        ></Image>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Polyamanita</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>Sign In</Text>
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
            navigation.goBack();
          }}
          size="small"
        />
      </>
    </View>
  );
};

export default SignupScreen;
