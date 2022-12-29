import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureButton.style";
import { Pressable, PressableProps } from "react-native";
// import { Camera } from "react-native-vision-camera";

// @params - onPress: when button is clicked what should be performed.
interface CaptureButtonProps extends PressableProps {
  onPress: () => unknown;
}

// async function takePhoto(cameraRef: RefObject<Camera>, flash: boolean) {
//   const isFlash = flash ? "on" : "off";
//   const photo = await cameraRef.current?.takePhoto({
//     flash: isFlash,
//   });
// }

const CaptureButton: React.FC<CaptureButtonProps> = ({ onPress }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Pressable
      style={styles.button}
      onPressIn={onPress}
      onPressOut={() => console.log("out")}
    ></Pressable>
  );
};

export default CaptureButton;
