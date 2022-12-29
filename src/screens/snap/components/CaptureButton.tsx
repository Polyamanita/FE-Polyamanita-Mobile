import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureButton.style";
import { Pressable, PressableProps } from "react-native";

// @params - onPress: when button is clicked what should be performed.
// @params - iconName: provides an icon for the button.
// @params - varient: Style choice of the button.
interface CaptureButtonProps extends PressableProps {
  onPress: () => unknown;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ onPress, ...rest }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable style={styles.button} {...rest} onPress={onPress}></Pressable>
  );
};

export default CaptureButton;
