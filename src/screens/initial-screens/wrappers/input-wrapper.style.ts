import { StyleSheet, ViewStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  wrapper: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: colors.primary100,
      paddingBottom: 30,
    },
  });
};
