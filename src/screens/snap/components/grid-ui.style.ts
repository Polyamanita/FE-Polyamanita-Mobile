import { ExtendedTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

interface VariationStyle {
  container: ViewStyle;
  grid: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const lineWidth = 1;

  return StyleSheet.create<VariationStyle>({
    container: {
      position: "absolute",
      width: windowWidth,
      height: windowHeight,
      flexDirection: "row",
      opacity: 0.45
    },
    grid: {
      width: windowWidth / 3,
      height: windowHeight / 3,
      borderWidth: lineWidth,
      borderColor: colors.secondary100,
    },
  });
};
