import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet } from "react-native";
import { ParamListBase, useIsFocused } from "@react-navigation/native";
import {
  Camera,
  CameraDeviceFormat,
  CameraProps,
  CameraRuntimeError,
  frameRateIncluded,
  PhotoFile,
  sortFormats,
  useCameraDevices,
} from "react-native-vision-camera";
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";

/**
 * ? Local Imports
 */
import CaptureButton from "./components/button-capture";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREENS } from "@shared-constants";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import AuxButton from "@shared-components/button-aux/button-aux";
import SnapHeader from "./components/header-snap";
import NavigationHeader from "@shared-components/tabnavigation-header/header-tabnavigation";
// import Text from "@shared-components/text-wrapper/TextWrapper";

interface SnapScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;
const MAX_ZOOM_FACTOR = 20;

const SnapScreen: React.FC<SnapScreenProps> = ({ navigation }) => {
  // Theme
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  // Camera
  const camera = useRef<Camera>(null);
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  // Check if snap screen is active.
  const isFocused = useIsFocused();
  const [flash, setFlash] = useState<"off" | "on">("off");

  // Mushroom app is for taking pictures of bootiful mushrooms! Not selfies >:(
  const devices = useCameraDevices().back;
  const supportsFlash = devices?.hasFlash ?? false;

  /* Formats is just a way to get the camera's specifications. 
     More here: https://mrousavy.com/react-native-vision-camera/docs/guides/formats/ */
  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (devices?.formats == null) return [];
    return devices.formats.sort(sortFormats);
  }, [devices?.formats]);

  // const supportsFlash = devices?.hasFlash ?? false;

  // Automatically assign camera that is 30FPS, change later?
  const format = formats.find((f) =>
    f.frameRateRanges.some((r) => frameRateIncluded(r, 30)),
  );

  // #region Animated Zoom
  const minZoom = devices?.minZoom ?? 1;
  const maxZoom = Math.min(devices?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps<Partial<CameraProps>>(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  // #endregion

  // #region Callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  const onMediaCaptured = useCallback(
    (media: PhotoFile) => {
      // Navigate and pass following data to capture screen.
      navigation.navigate(SCREENS.CAPTURE, {
        path: media.path,
        time: new Date(),
      });
    },
    [navigation],
  );

  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  // #endregion

  // #region Effects
  // Zoom effect.
  const neutralZoom = devices?.neutralZoom ?? 1;
  useEffect(() => {
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);
  // #endregion

  // #region Pinch to Zoom Gesture
  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { startZoom?: number }
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // Map scale gesture to a linear zoom.
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );

      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });
  // #endregion

  if (devices == undefined) {
    // Return a page while the promise is getting resolved.
    return <View style={{ backgroundColor: "black" }}></View>;
  }

  return (
    <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isFocused}>
      <Reanimated.View style={StyleSheet.absoluteFill}>
        <SnapHeader>
          <NavigationHeader
            title=""
            navigation={navigation}
            rightContent={
              <AuxButton
                onPress={() => {
                  setFlash(flash === "on" ? "off" : "on");
                }}
                iconName={flash === "on" ? "flash" : "flash-outline"}
              />
            }
          />
        </SnapHeader>
        <ReanimatedCamera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={devices}
          format={format}
          isActive={isFocused}
          onError={onError}
          photo={true}
          orientation="portrait"
          frameProcessorFps={1}
          zoom={zoom.value}
          animatedProps={cameraAnimatedProps}
        />
        <CaptureButton
          camera={camera}
          onMediaCaptured={onMediaCaptured}
          cameraZoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          flash={supportsFlash ? flash : "off"}
          setIsPressingButton={setIsPressingButton}
        />
      </Reanimated.View>
    </PinchGestureHandler>
  );
};

export default SnapScreen;
