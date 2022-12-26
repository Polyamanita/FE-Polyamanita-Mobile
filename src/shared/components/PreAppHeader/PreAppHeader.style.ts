import { ExtendedTheme } from "@react-navigation/native";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  logo: ImageStyle;
  appTitle: TextStyle;
  title: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    logo: {
      width: 196,
      height: 196,
    },

    appTitle: {
      color: colors.secondary100,
      fontSize: 32,
      fontWeight: "bold",
    },

    title: {
      color: colors.secondary100,
      fontSize: 24,
    },
  });
};
