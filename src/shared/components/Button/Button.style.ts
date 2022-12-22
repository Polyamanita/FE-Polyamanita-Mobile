import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface VariationStyle {
  default: ViewStyle;
  primary: ViewStyle;
  primaryOutline: ViewStyle;
  glass: ViewStyle;
}

// interface ITextStyle {
//   default: TextStyle,
//   primary: TextStyle,
//   primaryOutline: TextStyle,
//   glass: TextStyle,
// }

interface SizeStyle {
  large: ViewStyle;
  small: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  // Styling for pressable component.
  const variations = StyleSheet.create<VariationStyle>({
    default: {
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: colors.primary38,
      borderColor: colors.secondary50,
    },
    primary: {
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: colors.primaryA,
      borderColor: colors.secondary24,
    },
    primaryOutline: {
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: colors.secondary24,
    },
    glass: {
      justifyContent: "center",
      borderRadius: 50,
      borderWidth: 2,
    },
  });

  // Styling for text component.
  // TODO: Find a way of incorporating this any type to proper interface.
  const text = StyleSheet.create<any>({
    default: {
      fontSize: 18,
      color: colors.secondary100,
    },
    primary: {
      fontSize: 18,
      color: colors.secondary100,
    },
    primaryOutline: {
      fontSize: 18,
      color: colors.primaryA,
    },
    glass: {
      fontSize: 18,
      color: colors.secondary100,
    },
  });

  const sizes = StyleSheet.create<SizeStyle>({
    large: {
      height: 48,
      paddingHorizontal: 38,
      paddingVertical: 8,
    },
    small: {
      height: 38,
      paddingHorizontal: 30,
      paddingVertical: 8,
    },
  });

  return { variations, sizes, text };
};
