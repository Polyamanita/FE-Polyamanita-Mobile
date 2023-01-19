import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * ? Local Imports
 */
import createStyles from "./screen-wrapper.style";

interface ScreenWrapperProps {
  children?: JSX.Element | JSX.Element[] | undefined;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const gradientAngle = 135;

  return (
    <LinearGradient
      colors={[colors.backgroundA, colors.backgroundB]}
      useAngle={true}
      angle={gradientAngle}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeAreaContainer}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenWrapper;
