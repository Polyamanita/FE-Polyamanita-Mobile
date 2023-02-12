import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  title: TextStyle;
  leftContent: ViewStyle;
  rightContent: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    title: {
      alignSelf: "center",
      color: colors.secondary100,
      paddingLeft: 12,
    },
    leftContent: {
      display: "flex",
      flexDirection: "row",
    },
    rightContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 6,
    },
  });
};
