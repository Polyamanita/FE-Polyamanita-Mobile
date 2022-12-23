import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./InitialScreen.style";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";

interface LoginScreenProps {}

const InitialScreen: React.FC<LoginScreenProps> = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

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
      ></View>
      <>
        <Button
          title="Click me"
          onPress={() => {
            console.log("hello!!");
          }}
        />
        <Button
          title="Click me"
          onPress={() => {
            console.log("goodbhye");
          }}
          size="full"
        />
      </>
    </View>
  );
};

export default InitialScreen;
