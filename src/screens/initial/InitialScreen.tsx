import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { NavigationProp, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./InitialScreen.style";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const InitialScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
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
        <Text bold style={{ fontSize: 40 }}>
          Polyamanita
        </Text>
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
          title="Sign Up"
          onPress={() => {
            navigation.navigate(SCREENS.SIGNUP, {});
          }}
          size="full"
        />
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate(SCREENS.LOGIN, {});
          }}
          size="full"
        />
      </>
    </View>
  );
};

export default InitialScreen;
