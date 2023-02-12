import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  wrapper: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    wrapper: {
      borderRadius: 1000,
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      color: colors.warning,
    },
  });
};
