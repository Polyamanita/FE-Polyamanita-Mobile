import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, Dimensions } from "react-native";

interface Style {
  container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const windowHeight = Dimensions.get("window").height;
  return StyleSheet.create<Style>({
    container: {
      height: windowHeight,
      backgroundColor: colors.primary100,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
