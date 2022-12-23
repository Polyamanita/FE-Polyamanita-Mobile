import React, { useMemo, useRef, useState } from "react";
import { Button, Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./SigninScreen.style";
import Input from "@shared-components/Input/Input";

interface LoginScreenProps {}

const SigninScreen: React.FC<LoginScreenProps> = () => {
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
          placeholder="Password"
          status=""
        />
      </View>
      <View>
        <Button onPress={() => {}} title="Sign In" />
        <Button onPress={() => {}} title="Cancel" />
      </View>
    </View>
  );
};

export default SigninScreen;
