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
  const horizontalPadding = 7;

  return StyleSheet.create<Style>({
    wrapper: {
      paddingVertical: 3,
      marginHorizontal: 6,
      width: 275,
    },

    fieldWrapper: {
      backgroundColor: colors.fieldBackground,
      borderColor: colors.secondary50,
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: horizontalPadding,
      height: 125,
      margin: 9,
    },

    textfield: {
      color: colors.secondary100,
      fontSize: 48,
      textAlignVertical: "center",
      height: "100%",
      width: "100%",
      textAlign: "center",
      letterSpacing: 5,
      fontWeight: "500",
    },

    indicator: {
      alignSelf: "center",
      paddingLeft: 7,
    },

    subheading: {
      paddingTop: Math.floor(horizontalPadding / 4),
      paddingLeft: horizontalPadding,
      color: colors.secondary78,
      fontSize: 16,
      alignSelf: "center",
    },
  });
};
