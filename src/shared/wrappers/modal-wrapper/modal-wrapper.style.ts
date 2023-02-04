import { ExtendedTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  safeAreaContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Adjust the modal to fit ontop of header, but down from top of screen.
  const modalAdjustment = 33;
  const windowHeight = Dimensions.get("window").height - modalAdjustment;
  // const windowWidth = Dimensions.get("screen").width;
  const topBorderRadius = 33;

  return StyleSheet.create<Style>({
    container: {
      top: modalAdjustment,
      backgroundColor: colors.primary54,
      borderTopLeftRadius: topBorderRadius,
      borderTopRightRadius: topBorderRadius,
      height: windowHeight,
      paddingTop: 18,
      paddingHorizontal: 15,
    },
    safeAreaContainer: {
      paddingTop: 15,
      paddingHorizontal: 15,
      height: windowHeight,
    },
  });
};
