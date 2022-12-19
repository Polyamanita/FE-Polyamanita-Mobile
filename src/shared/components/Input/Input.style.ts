import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  textfield: ViewStyle;
  subheading: Text;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const horizontalPadding = 20;

  return StyleSheet.create<Style>({
    container: {
      paddingVertical: 5,
    },
    textfield: {
      // element styling
      backgroundColor: colors.fieldBackground,
      borderColor: colors.secondary50,
      borderWidth: 1,
      borderRadius: 50,
      width: "100%",
      paddingHorizontal: horizontalPadding,
      height: 45,
      minWidth: 297,

      // text
      color: colors.secondary100,
    },

    subheading: {
      paddingTop: Math.floor(horizontalPadding / 4),
      paddingLeft: horizontalPadding,
      color: colors.secondary78,
    },
  });
};
