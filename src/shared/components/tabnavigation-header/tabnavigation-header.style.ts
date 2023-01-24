import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      color: colors.primary100,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  });
};
