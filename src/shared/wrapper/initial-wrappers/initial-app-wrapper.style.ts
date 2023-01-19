import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  wrapper: ViewStyle;
  logo: ImageStyle;
  appName: TextStyle;
  title: TextStyle;
  heading: TextStyle;
  content: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  // Logo should cover about a 1/3 of the screen.
  const windowHeight = Dimensions.get("window").height;
  const logoSize = Math.floor(windowHeight / 3);

  return StyleSheet.create<Style>({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 35,
    },

    logo: {
      alignSelf: "center",
      width: logoSize,
      height: logoSize,
    },

    appName: {
      alignSelf: "center",
      color: colors.secondary100,
      fontSize: 38,
      fontWeight: "bold",
    },

    title: {
      alignSelf: "center",
      color: colors.secondary100,
      fontSize: 24,
    },

    heading: {
      alignSelf: "center",
      color: colors.secondary100,
      fontSize: 16,
      textAlign: "center",
    },

    content: {
      width: "100%",
    },
  });
};
