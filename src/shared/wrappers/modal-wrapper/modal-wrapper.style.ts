import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Adjust the modal to fit ontop of header, but down from top of screen.
  const modalBorderWidth = 2;
  const topBorderRadius = 15;
  const spacingSize = 15;

  return StyleSheet.create<Style>({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.primary100,
      borderTopLeftRadius: topBorderRadius,
      borderTopRightRadius: topBorderRadius,
      borderBottomLeftRadius: topBorderRadius,
      borderBottomRightRadius: topBorderRadius,
      borderColor: "red",
      borderWidth: modalBorderWidth,
      paddingTop: spacingSize + 5,
      paddingHorizontal: spacingSize,
    },
  });
};
