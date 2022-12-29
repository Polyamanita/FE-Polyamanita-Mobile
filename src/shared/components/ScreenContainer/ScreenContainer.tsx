import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ScreenContainer.style";
import LinearGradient from "react-native-linear-gradient";

interface ScreenContainerProps {
  children?: JSX.Element | JSX.Element[] | undefined;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  return (
    <LinearGradient
      colors={[colors.backgroundA, colors.backgroundB]}
      useAngle={true}
      angle={135}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenContainer;
