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
  informationContainer: ViewStyle;
  informationHeader: ViewStyle;
  informationText: Text;
  informationListText: Text;
  informationLinkContainer: ViewStyle;
  informationLinkIcon: ImageStyle;
  logo: ImageStyle;
  nameText: TextStyle;
  notesBox: ViewStyle;
  notesContainer: ViewStyle;
  notesHeader: ViewStyle;
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
      height: 80,
      marginHorizontal: 6,
      justifyContent: "center",
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
      lineHeight: 24,
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
    galleryContainer: {
      marginTop: 12,
      marginBottom: 24,
    },
    galleryHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      width: "100%",
    },
    galleryImage: {
      borderColor: "lime",
      height: "100%",
      width: 110,
      marginHorizontal: 1,
    },
    galleryImages: {
      borderWidth: 1,
      backgroundColor: colors.primary12,
      borderColor: colors.primary38,
      borderRadius: 15,
      height: 120,
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
    informationContainer: {
      marginTop: 12,
      marginBottom: 24,
    },
    informationHeader: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      width: "100%",
    },
    informationText: {
      fontSize: 24,
    },
    informationListText: {
      fontSize: 20,
    },
    informationLinkContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
    informationLinkIcon: {
      height: 35,
      width: 35,
      marginRight: 15,
      borderRadius: 100,
      backgroundColor: "red",
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
    notesBox: {
      borderRadius: 15,
      backgroundColor: colors.primary100,
      height: 150,
      overflow: "hidden",
    },
    notesContainer: {
      marginBottom: 24,
    },
    notesHeader: { marginBottom: 16 },
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
