import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface CaptureScreenProps {}

const CaptureScreen: React.FC<CaptureScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Capture
      </Text>
    </View>
  );
};

export default CaptureScreen;
