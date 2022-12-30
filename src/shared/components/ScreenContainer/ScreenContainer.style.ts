import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  gradientContainer: ViewStyle;
  safeAreaContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    gradientContainer: {
      backgroundColor: colors.backgroundB,
    },
    safeAreaContainer: {
      paddingHorizontal: 15,
      height: "100%",
    },
  });
};
