import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ScreenContainer.style";
import { View } from "react-native";

interface ScreenContainerProps {
  children?: JSX.Element | JSX.Element[] | undefined;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.container}>{children}</View>;
};

export default ScreenContainer;
