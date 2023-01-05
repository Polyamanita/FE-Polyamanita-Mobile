import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureScreen.style";
import { StackNavigationProp } from "@react-navigation/stack";

interface CaptureScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}

const CaptureScreen: React.FC<CaptureScreenProps> = ({ route }) => {
  const theme = useTheme();
  //  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { path } = route.params;
  console.log("CAPUTRE SCREEN: ", JSON.stringify(path));

  return (
    <View style={styles.container}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: `file://${path}` }}
      />
    </View>
  );
};

export default CaptureScreen;
