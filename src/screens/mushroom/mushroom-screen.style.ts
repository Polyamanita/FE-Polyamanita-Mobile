import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from "react-native";

interface Style {
  box: ViewStyle;
  countBox: ViewStyle;
  countBoxLarge: ViewStyle;
  countBoxContainer: ViewStyle;
  countBoxNumber: TextStyle;
  countBoxText: TextStyle;
  container: ViewStyle;
  galleryContainer: ViewStyle;
  galleryHeader: ViewStyle;
  galleryImage: ImageStyle;
  galleryImages: ViewStyle;
  galleryText: TextStyle;
  galleryViewBox: ViewStyle;
  galleryViewText: TextStyle;
  logo: ImageStyle;
  nameText: TextStyle;
  sciNameText: TextStyle;
  text: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    box: {
      backgroundColor: colors.primary24,
      borderColor: colors.secondary50,
      borderWidth: 1,
    },
    countBox: {
      alignItems: "center",
      borderRadius: 15,
      height: "86%", // Ratio from Figma
      marginHorizontal: 6,
      // justifyContent: "center",
      opacity: 0.75,
      width: "18%", // Ratio from Figma
    },
    countBoxContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      paddingVertical: 12,
      width: "100%",
    },
    countBoxLarge: {
      // This is the basis for all 3 boxes' heights
      backgroundColor: colors.primary38,
      height: 94,
      opacity: 1,
      width: "20%", // Ratio from Figma
    },
    countBoxNumber: {
      fontSize: 24,
      fontWeight: "700",
    },
    countBoxText: {
      color: colors.secondary50,
    },
    container: {
      alignItems: "center",
      backgroundColor: colors.background,
      justifyContent: "center",
    },
    galleryContainer: {},
    galleryHeader: {
      alignItems: "center",
      // borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    galleryImage: {
      // borderWidth: 1,
      borderColor: "lime",
      width: 100,
      height: 100,
    },
    galleryImages: {
      // borderWidth: 1,
      borderRadius: 15,
      height: 100,
      overflow: "hidden",
      flexDirection: "row",
      width: "100%",
    },
    galleryText: {
      fontSize: 24,
    },
    galleryViewBox: {
      alignItems: "center",
      backgroundColor: colors.primary38,
      justifyContent: "center",
      borderRadius: 100,
      height: 38,
      width: 100,
    },
    galleryViewText: {
      fontSize: 16,
      fontWeight: "300",
      lineHeight: 20,
      textAlign: "center",
    },
    logo: {
      alignSelf: "center",
      resizeMode: "contain",
      width: "100%",
    },
    nameText: {
      fontSize: 30,
      lineHeight: 30,
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
