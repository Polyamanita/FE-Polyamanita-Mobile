import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Camera, CameraDevice } from "react-native-vision-camera";
/* import { 
  Reanimated, 
  Extrapolate, 
  interpolate, 
  useAnimatedGestureHandler, 
  useAnimatedProps, 
  useSharedValue 
} from 'react-native-reanimated';
*/
/**
 * ? Local Imports
 */
import createStyles from "./SnapScreen.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";

interface SnapScreenProps {}

const windowHeight = Dimensions.get("window").height;
console.log(windowHeight);

// const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
// Reanimated.addWhitelistedNativeProps({zoom: true});

// const SCALE_FULL_ZOOM = 3;
// const BUTTON_SIZE = 40;

const SnapScreen: React.FC<SnapScreenProps> = () => {
  // Theme
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Camera
  const camera = useRef<Camera>(null);
  const [devices, setDevices] = useState<CameraDevice[]>();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function getDevices() {
      const device = await Camera.getAvailableCameraDevices();
      setDevices(device);
    }

    getDevices();
  }, [isFocused]);

  if (devices == undefined) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.primary100 }}>
          No camera devices found. :(
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ width: "100%", height: windowHeight }}
        ref={camera}
        device={devices[0]}
        preset={"photo"}
        isActive={isFocused}
        photo={true}
      />
    </View>
  );
};

export default SnapScreen;
