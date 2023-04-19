import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { modelResults, shroomalyze } from "./utils/shroomalyze";
import {
  getS3Response,
  getPosition,
  buildCaptureIDFromShroomalysis,
  stripParamsFromLink,
  handlePostCapture,
  markUnread,
} from "./utils/capture";
import { CaptureInstance, Instance } from "api/constants/journal";
/**
 * ? Local Imports
 */
import createStyles from "./capture-screen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/button-aux/button-aux";
import Button from "@shared-components/button-primary/button-primary";
import SnapHeader from "./wrappers/header-snap-stack-wrapper";
import CancelButton from "./components/button-cancel";
import { PhotoFile } from "react-native-vision-camera";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import { Location } from "api/constants/location";
import { S3LinkResponse } from "api/constants/image";
import { Dispatch } from "redux";
import { localString } from "shared/localization";
import { saveImage } from "storage/imageSave";
import { SCREENS } from "shared/constants/navigation-routes";
import { MUSHROOM_IDS } from "shared/constants/mushroom-names";
import Text from "@shared-components/text-wrapper/TextWrapper";
import LocationButton from "./components/button-capture-location-share";

interface CaptureScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}

// handelModel runs async task to run the shroomalyzer.
const handleModel = async (photo: PhotoFile) => shroomalyze(photo.path);
// When the shroomalyzer is done, if an instance is identified, handle an upplaod.
const handleUpload = async (
  userID: string,
  photo: PhotoFile,
  captureTime: string,
  modelData: modelResults,
  saveLatLong: boolean,
  dispatch: Dispatch,
): Promise<{ captureID: string; instance: Instance; photoPath: string }> => {
  return new Promise((resolve, reject) => {
    const position: Promise<Location> = getPosition(
      saveLatLong,
    ) as Promise<Location>;
    const s3Response = getS3Response(userID) as Promise<S3LinkResponse>;

    Promise.all([position, s3Response])
      .then((uploadResolve: [resPos: Location, resS3: S3LinkResponse]) => {
        // console.log("Key: ", resolvedS3Response);
        // console.log("Position: ", resolvedPosition);
        const [resolvedPosition, resolvedS3Response] = uploadResolve;
        const [{ s3Key, uploadLink }] = resolvedS3Response.links;
        const instance = {
          dateFound: captureTime,
          latitude: resolvedPosition.latitude,
          longitude: resolvedPosition.longitude,
          location: resolvedPosition.location,
          s3Key: s3Key,
          imageLink: stripParamsFromLink(uploadLink),
        } as Instance;

        console.log(instance.dateFound);

        const captureID = buildCaptureIDFromShroomalysis(modelData);
        const captureInstance = {
          captureID: captureID,
          instances: [instance],
          // none of these should overwrite, right?
          notes: "",
          timesFound: 0,
          userID: userID,
        } as CaptureInstance;

        handlePostCapture(
          userID,
          photo.path,
          captureInstance,
          uploadLink,
          dispatch,
        );

        // Add unread badge to journal
        markUnread(captureID, dispatch);

        resolve({
          captureID: captureID,
          instance: instance,
          photoPath: photo.path,
        });
      })
      .catch((uploadError) => {
        reject(uploadError);
      });
  });
};

const CaptureScreen: React.FC<CaptureScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // Passed from SnapScreen, contains image info.
  const { photo, path } = route.params;
  const userID = useSelector(
    (store: ReduxStore) => store.userData.userID as string,
  );

  const dispatch = useDispatch();

  // #region locationsharing on/off
  const [location, setLocation] = useState<boolean>(true);
  // #endregion

  // #region analyze button hit handeling.
  const [loading, setLoading] = useState<"flex" | "none">("none");
  const [pressable, setPressable] = useState(true);
  const [loadOpacity, setLoadingOpacity] = useState<0.3 | 1>(1);
  const onAnalyze = () => {
    setPressable(false);
    setLoading("flex");
    setLoadingOpacity(0.3);
  };
  // #endregion
  return (
    <>
      <View style={{ ...styles.loading, display: loading }}>
        <ActivityIndicator color={colors.primaryA} size={"large"} />
        <Text h3 style={{ textAlign: "center", color: colors.secondary100 }}>
          Shroomalyzing...
        </Text>
      </View>
      <View style={{ ...styles.container, opacity: loadOpacity }}>
        <SnapHeader
          leftContnet={undefined}
          rightContent={
            <CancelButton pressable={pressable} navigation={navigation} />
          }
        />
        <Image
          style={StyleSheet.absoluteFill}
          source={{ uri: `file://${path}` }}
        />
        <View
          style={{
            flexDirection: "row-reverse",
            paddingBottom: 10,
            paddingLeft: 5,
          }}
        >
          <Button
            title={localString.snapScreen.analyze}
            onPress={() => {
              // Handel UI changes when button is pressed.
              onAnalyze();

              // Perform shroomalzyer tasks.
              const time = new Date().toISOString();
              handleModel(photo)
                .then((modelResolve: modelResults) => {
                  handleUpload(
                    userID,
                    photo,
                    time,
                    modelResolve,
                    location,
                    dispatch,
                  ).then((resolve) => {
                    console.log(
                      "Mushroom ID",
                      MUSHROOM_IDS[resolve.captureID].common,
                    );
                    navigation.navigate(SCREENS.POSTCAPTURE, resolve);
                    Alert.alert(
                      "Congratulations!",
                      `You captured a ${
                        MUSHROOM_IDS[resolve.captureID].common
                      }!` +
                        "\n" +
                        "Head to the Journal screen to view your new capture.",
                    );
                  });
                })
                .catch(() => {
                  Alert.alert(
                    "Sorry,",
                    "The Shroomalyzer couldn't identify anything :(",
                  );
                  setPressable(true);
                  setLoading("none");
                  setLoadingOpacity(1);
                });
            }}
            pressable={pressable}
            varient={"primary"}
            size={"large"}
          />
          <AuxButton
            pressable={pressable}
            onPress={() => saveImage(path)}
            iconName={"content-save"}
          />
          <LocationButton location={location} setLocation={setLocation} />
        </View>
      </View>
    </>
  );
};

export default CaptureScreen;
