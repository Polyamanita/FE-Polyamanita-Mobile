import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import createStyles from "./centering-ui.style";

interface CenteringUIProps {}

// Small wrapper to contain the camera controls on the snap screen.
const CenteringUI: React.FC<CenteringUIProps> = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles.element}></View>;
};

export default CenteringUI;
