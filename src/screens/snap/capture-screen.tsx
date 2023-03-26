import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { modelResults, shroomalyze } from "./utils/shroomalyze";
import {
  getS3Response,
  getPosition,
  buildCaptureIDFromShroomalysis,
  stripParamsFromLink,
  handlePostCapture,
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
  modelResults: modelResults,
  dispatch: Dispatch,
) => {
  const position = getPosition() as Promise<Location>;
  const s3Response = getS3Response(userID) as Promise<S3LinkResponse>;

  Promise.all([position, s3Response]).then(
    (uploadResolve: [resPos: Location, resS3: S3LinkResponse]) => {
      const [resolvedPosition, resolvedS3Response] = uploadResolve;
      console.log("Position: ", resolvedPosition);
      console.log("Key: ", resolvedS3Response);

      const [{ s3Key, uploadLink }] = resolvedS3Response.links;

      const instance = {
        dateFound: captureTime,
        latitude: resolvedPosition.latitude,
        longitude: resolvedPosition.longitude,
        location: resolvedPosition.location,
        s3Key: s3Key,
        imageLink: stripParamsFromLink(uploadLink),
      } as Instance;

      const captureID = buildCaptureIDFromShroomalysis(modelResults);
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
    },
  );
};

const CaptureScreen: React.FC<CaptureScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  //  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // Passed from SnapScreen, contains image info.
  const { photo, path } = route.params;
  const userID = useSelector(
    (store: ReduxStore) => store.userData.userID as string,
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SnapHeader
        leftContnet={undefined}
        rightContent={<CancelButton navigation={navigation} />}
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
            const time = new Date().toISOString();
            handleModel(photo)
              .then((modelResolve) => {
                handleUpload(userID, photo, time, modelResolve, dispatch);
              })
              .catch((modelRejection) => {
                console.log(modelRejection);
              });
          }}
          varient={"primary"}
          size={"large"}
        />
        <AuxButton onPress={() => saveImage(path)} iconName={"content-save"} />
      </View>
    </View>
  );
};

export default CaptureScreen;
