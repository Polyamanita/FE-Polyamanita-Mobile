import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";

interface Style {
  logo: ImageStyle;
  nameText: TextStyle;
  notFoundContainer: ViewStyle;
  notFoundText: TextStyle;
  notFoundText2: TextStyle;
  sciNameText: TextStyle;
  text: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    logo: {
      alignSelf: "center",
      resizeMode: "contain",
      width: "100%",
    },
    nameText: {
      fontSize: 30,
      lineHeight: 30,
    },
    notFoundContainer: {
      paddingTop: 84,
    },
    notFoundText: {
      color: colors.secondary78,
      fontSize: 18,
      fontStyle: "italic",
      textAlign: "center",
    },
    notFoundText2: {
      fontSize: 18,
      textAlign: "center",
    },
    sciNameText: {
      fontSize: 20,
      fontStyle: "italic",
      fontWeight: "300",
      lineHeight: 26,
    },
    text: {
      color: colors.secondary100,
    },
  });
};
