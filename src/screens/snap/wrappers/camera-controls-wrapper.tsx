import React, { useMemo } from "react";
import { View } from "react-native";
import createStyles from "./camera-controls-wrapper.style";

interface CameraControlsProps {
  children: JSX.Element | JSX.Element[] | undefined;
}

// Small wrapper to contain the camera controls on the snap screen.
const CameraControls: React.FC<CameraControlsProps> = ({
  children,
}: CameraControlsProps) => {
  const styles = useMemo(() => createStyles(), []);
  return <View style={styles.wrapper}>{children}</View>;
};

export default CameraControls;
