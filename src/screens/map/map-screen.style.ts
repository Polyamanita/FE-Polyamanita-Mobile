import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  map: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.primary100,
    },
    map: { ...StyleSheet.absoluteFillObject },
  });
};
