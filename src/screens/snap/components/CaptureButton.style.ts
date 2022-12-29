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
      position: "absolute",
      alignSelf: "center",
      bottom: 15,
      borderRadius: 50,
      borderWidth: 2,
      width: 75,
      height: 75,
      backgroundColor: colors.warning,
    },
  });
};
