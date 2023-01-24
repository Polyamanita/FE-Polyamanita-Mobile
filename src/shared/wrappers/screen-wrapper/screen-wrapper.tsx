import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * ? Local Imports
 */
import createStyles from "./screen-wrapper.style";
import { ScrollView } from "react-native-gesture-handler";

interface ScreenWrapperProps {
  children?: JSX.Element | JSX.Element[] | undefined;
}

// This wrapper encloses screens that have a gradient background.
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
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenWrapper;
