import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  leftWrapper: ViewStyle;
  title: TextStyle;
  leftContent: ViewStyle;
  rightContent: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    leftWrapper: {
      flexDirection: "row",
    },
    title: {
      alignSelf: "center",
      color: colors.secondary100,
      paddingLeft: 9,
    },
    leftContent: {
      alignSelf: "center",
      flexDirection: "row",
    },
    rightContent: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });
};
