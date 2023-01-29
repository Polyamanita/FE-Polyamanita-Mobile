import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
import createStyles from "./grid-ui.style";

interface CenteringUIProps {
  display: "flex" | "none";
}

const GridColoumn = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      <View style={styles.grid} />
      <View style={styles.grid} />
      <View style={styles.grid} />
    </View>
  );
};

// Small wrapper to contain the camera controls on the snap screen.
const GridUI: React.FC<CenteringUIProps> = ({ display }: CenteringUIProps) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={{ ...styles.container, display: display }}>
      <GridColoumn />
      <GridColoumn />
      <GridColoumn />
    </View>
  );
};

export default GridUI;
