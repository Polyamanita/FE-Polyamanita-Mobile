import { StyleSheet, ViewStyle } from "react-native";

interface VariationStyle {
  wrapper: ViewStyle;
}

export default () => {
  return StyleSheet.create<VariationStyle>({
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      position: "absolute",
      alignSelf: "center",
      bottom: 15,
    },
  });
};
