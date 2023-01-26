import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle } from "react-native";

interface VariationStyle {
  button: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Styling for pressable component.
  return StyleSheet.create<VariationStyle>({
    button: {
      borderRadius: 50,
      borderWidth: 2,
      width: 90,
      height: 90,
      backgroundColor: colors.warning,
    },
  });
};
