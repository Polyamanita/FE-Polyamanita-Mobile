import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  digitContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      backgroundColor: colors.backgroundB,
    },
    digitContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
    },
  });
};
