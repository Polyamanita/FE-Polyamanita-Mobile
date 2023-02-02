import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ExtendedTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

interface VariationStyle {
  element: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Styling for pressable component.
  const windowHeight = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();
  const middle = Math.floor((windowHeight - tabBarHeight) / 2);

  const uiSize = 175;
  return StyleSheet.create<VariationStyle>({
    element: {
      borderRadius: 1000,
      borderWidth: 2,
      width: uiSize,
      height: uiSize,
      alignSelf: "center",
      top: middle,
      backgroundColor: colors.primary12,
    },
  });
};
