import { ExtendedTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { TABBAR_HEIGHT } from "shared/constants/numeric-styling";

interface Style {
  container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Adjust the modal to fit ontop of header, but down from top of screen.
  const modalAdjustment = 33;
  const modalBorderWidth = 2;
  const windowHeight =
    Dimensions.get("window").height -
    modalAdjustment +
    TABBAR_HEIGHT +
    modalBorderWidth;
  const topBorderRadius = 15;
  const spacingSize = 15;

  return StyleSheet.create<Style>({
    container: {
      top: modalAdjustment,
      backgroundColor: colors.primary100,
      borderTopLeftRadius: topBorderRadius,
      borderTopRightRadius: topBorderRadius,
      borderBottomLeftRadius: topBorderRadius,
      borderBottomRightRadius: topBorderRadius,
      borderColor: "red",
      borderWidth: modalBorderWidth,
      height: windowHeight,
      marginHorizontal: spacingSize,
      paddingTop: spacingSize + 5,
      paddingHorizontal: spacingSize,
    },
  });
};
