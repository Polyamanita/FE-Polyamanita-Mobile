import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  gradientContainer: ViewStyle;
  safeAreaContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    gradientContainer: {
      backgroundColor: colors.backgroundB,
    },
    safeAreaContainer: {
      paddingHorizontal: 15,
      height: "100%",
    },
  });
};
