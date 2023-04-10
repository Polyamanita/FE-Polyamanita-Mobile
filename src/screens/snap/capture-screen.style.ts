import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  loading: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    loading: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "#00000080",
      justifyContent: "center",
      textAlign: "center",
    },
  });
};
