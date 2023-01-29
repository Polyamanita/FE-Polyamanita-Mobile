import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      height: 500,
      backgroundColor: colors.primary100,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
