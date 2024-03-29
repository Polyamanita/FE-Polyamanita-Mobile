import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface VariationStyle {
  default: ViewStyle;
  primary: ViewStyle;
  primaryOutline: ViewStyle;
  glass: ViewStyle;
}

interface SizeStyle {
  large: ViewStyle;
  small: ViewStyle;
  full: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const generalViewStyling = {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 2,
    marginHorizontal: 5,
  } as ViewStyle;

  // Styling for pressable component.
  const variations = StyleSheet.create<VariationStyle>({
    default: {
      ...generalViewStyling,
      backgroundColor: colors.primary38,
      borderColor: colors.secondary24,
    },
    primary: {
      ...generalViewStyling,
      backgroundColor: colors.primaryA,
      borderColor: colors.secondary78,
    },
    primaryOutline: {
      ...generalViewStyling,
      backgroundColor: colors.secondary14,
    },
    glass: {
      ...generalViewStyling,
    },
  });

  // Styling for text component.
  const generalTextStyling = {
    fontSize: 24,
    width: "100%",
    height: "100%",
    textAlignVertical: "center",
    textAlign: "center",
  } as TextStyle;
  // TODO: Find a way of incorporating this any type to proper interface.
  const text = StyleSheet.create<VariationStyle>({
    default: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
    primary: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
    primaryOutline: {
      ...generalTextStyling,
      color: colors.primaryA,
      borderColor: colors.primaryA,
    },
    glass: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
  });

  const sizes = StyleSheet.create<SizeStyle>({
    large: {
      height: 55,
      width: 198,
    },
    small: {
      height: 44,
      width: 136,
    },
    full: {
      width: "100%",
      height: 55,
      marginHorizontal: 40,
      marginBottom: 20,
    },
  });

  return { variations, sizes, text };
};
