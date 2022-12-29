import React, { useEffect, useMemo, useState } from "react";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Camera, CameraDevice } from "react-native-vision-camera";

/**
 * ? Local Imports
 */
import createStyles from "./SnapScreen.style";
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { Text, View } from "react-native";

interface SnapScreenProps {}

const SnapScreen: React.FC<SnapScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

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
    console.log("Device not found on device.");
    return (
      <View>
        <Text style={{ color: colors.primary100 }}>Not found</Text>
      </View>
    );
  }

  return (
    <Camera style={styles.container} device={devices[0]} isActive={isFocused} />
  );
};

export default SnapScreen;
