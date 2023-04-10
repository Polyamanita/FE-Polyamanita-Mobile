import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  permissionTextWrapper: ViewStyle;
  text: TextStyle;
  rejectText: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    permissionTextWrapper: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: -25, // hacky.
    },
    text: {
      color: colors.secondary100,
      textAlign: "center",
      alignSelf: "center",
      alignContent: "center",
    },
    rejectText: {
      padding: 7,
      color: colors.secondary100,
      fontSize: 20,
      textAlign: "center",
    },
  });
};
