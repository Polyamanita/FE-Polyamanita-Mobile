import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./MapScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface MapScreenProps {}

const MapScreen: React.FC<MapScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Map
      </Text>
    </View>
  );
};

export default MapScreen;
