import { ExtendedTheme } from "@react-navigation/native";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  wrapper: ViewStyle;
  wrapperGrayed: ViewStyle;
  wrapperUnread: ViewStyle;
  outerWrapper: ViewStyle;
  text: TextStyle;
  newText: TextStyle;
  icon: ImageStyle;
  iconUnread: ImageStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    wrapper: {
      width: "100%",
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 50,
      height: 50,
      backgroundColor: "gray",
      marginVertical: 3,
    },

    wrapperGrayed: {
      backgroundColor: colors.grayedOut,
    },

    wrapperUnread: {
      borderColor: "gold",
    },

    outerWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    text: {
      color: colors.secondary100,
      paddingHorizontal: 10,
      fontSize: 18,
      flexShrink: 1,
      height: "100%",
      textAlignVertical: "center",
    },
    newText: { color: "gold" },
    icon: {
      height: 55,
      width: 55,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 50,
      alignSelf: "center",
    },
    iconUnread: {
      borderColor: "gold",
    },
  });
};
