import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  sectionContent: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  const spacingSize = 15;

  return StyleSheet.create<Style>({
    container: {
      borderColor: colors.warning,
      borderWidth: 1,
      marginVertical: spacingSize,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      color: colors.secondary100,
    },
    sectionContent: {
      paddingVertical: spacingSize / 2,
    },
  });
};
