import { ExtendedTheme } from "@react-navigation/native";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
  wrapper: ViewStyle;
  fieldWrapper: ViewStyle;
  textfield: ViewStyle;
  indicator: ImageStyle;
  subheading: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const horizontalPadding = 15;

  return StyleSheet.create<Style>({
    wrapper: {
      minWidth: "100%",
      maxWidth: "100%",
      paddingVertical: 3,
    },

    fieldWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.fieldBackground,
      borderColor: colors.secondary50,
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: horizontalPadding,
      height: 55,
    },

    textfield: {
      color: colors.secondary100,
      fontSize: 18,
    },

    indicator: {
      alignSelf: "center",
    },

    subheading: {
      paddingTop: Math.floor(horizontalPadding / 4),
      paddingLeft: horizontalPadding,
      color: colors.secondary78,
    },
  });
};
