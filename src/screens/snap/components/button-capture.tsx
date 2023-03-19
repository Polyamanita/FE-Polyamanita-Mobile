import React, { useCallback, useMemo, useRef } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./button-capture.style";
import { Pressable, PressableProps } from "react-native";
import {
  Camera,
  PhotoFile,
  TakePhotoOptions,
  TakeSnapshotOptions,
} from "react-native-vision-camera";
import { SharedValue } from "react-native-reanimated";

interface CaptureButtonProps extends PressableProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (media: PhotoFile, type: "photo") => void;
  cameraZoom: SharedValue<number>;
  minZoom: number;
  maxZoom: number;
  flash: "on" | "off";
  setIsPressingButton: (_isPressingButton: boolean) => void;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({
  camera,
  onMediaCaptured,
  flash,
}) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pressDownDate = useRef<Date | undefined>(undefined);
  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: "jpeg",
      qualityPrioritization: "speed",
      flash: flash,
      quality: 90,
      skipMetadata: false,
    }),
    [flash],
  );

  //#region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error("Camera ref is null!");
      // Get the current date and assign it.
      const now = new Date();
      pressDownDate.current = now;

      const photo = await camera.current.takeSnapshot(takePhotoOptions);
      onMediaCaptured(photo, "photo");
    } catch (e) {
      console.error("Failed to take a photo. :c", e);
    }
  }, [camera, onMediaCaptured, takePhotoOptions]);
  // #endregion

  // #region Tap handler
  // #endregion

  return <Pressable onPressOut={takePhoto} style={styles.button} />;
};

export default CaptureButton;
