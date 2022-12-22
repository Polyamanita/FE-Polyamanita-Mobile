import React, { useMemo } from "react";
import { Button, Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./InitialScreen.style";
import PolyButton from "@shared-components/Button/Button";

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
      <View>
        <Button onPress={() => {}} title="Sign In" />
        <Button onPress={() => {}} title="Cancel" />
        <PolyButton title="Click Me" varient="default" size="large" />
      </View>
    </View>
  );
};

export default InitialScreen;
