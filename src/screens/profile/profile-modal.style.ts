import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  avatarPivotContainer: ViewStyle;
  avatarContainer: ViewStyle;
  username: ViewStyle;
  userstats: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const pivotSize = 100;
  return StyleSheet.create<Style>({
    container: {
      backgroundColor: colors.primary50,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarPivotContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
    },
    avatarContainer: {
      height: pivotSize,
      width: pivotSize,
      borderRadius: 1000,
    },
    username: {
      padding: 5,
      color: colors.secondary100,
    },
    userstats: {
      color: colors.secondary100,
      textAlign: "center",
    },
  });
};
