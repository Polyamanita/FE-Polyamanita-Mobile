import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface VariationStyle {
  default: ViewStyle;
  glass: ViewStyle;
  avatar: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const generalViewStyling = {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 2,
    width: 55,
    height: 55,
  } as ViewStyle;

  // Styling for pressable component.
  const variations = StyleSheet.create<VariationStyle>({
    default: {
      ...generalViewStyling,
      backgroundColor: colors.primary54,
      borderColor: colors.secondary24,
    },
    glass: {
      ...generalViewStyling,
    },
    avatar: {
      ...generalViewStyling,
    },
  });

  // Styling for text component.
  const generalTextStyling = {
    fontSize: 24,
  } as TextStyle;
  const icon = StyleSheet.create<VariationStyle>({
    default: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
    glass: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
    avatar: {
      ...generalTextStyling,
    },
  });

  return { variations, icon };
};
