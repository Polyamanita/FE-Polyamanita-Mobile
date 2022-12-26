import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface VariationStyle {
  default: ViewStyle;
  glass: ViewStyle;
  avata: ViewStyle;
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
    avata: {
      ...generalViewStyling,
    },
  });

  // Styling for text component.
  const generalTextStyling = {
    fontSize: 24,
  } as TextStyle;
  // TODO: Find a way of incorporating this any type to proper interface.
  const icon = StyleSheet.create<any>({
    default: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
    glass: {
      ...generalTextStyling,
      color: colors.secondary100,
    },
  });

  return { variations, icon };
};
