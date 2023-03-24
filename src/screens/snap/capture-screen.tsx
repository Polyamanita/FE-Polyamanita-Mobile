import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import RNFS from "react-native-fs";
import { shroomalyze } from "./utils/shroomalyze";
import {
  getS3Response,
  getCurrentPosition,
  buildCaptureIDFromShroomalysis,
  stripParamsFromLink,
  handlePostCapture,
} from "./utils/capture";
import { createFileName } from "./utils/save";
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
import { doPostCaptures } from "api/requests";
import { AxiosResponse } from "axios";

interface CaptureScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}

// Handle capture should be a syncronous function that handles a set
// of async tasks.

/* PROTO: 
        When the user hits capture. A couple actions need to take place.
        ?. TODO: Display loading animation, these sets of actions will take a bit. :d

        -- ASYNC TASKS
        ?. TODO: Run tensorflow on imageframe through VisionCamera using frame processor.
            * On sucess, assign variable for mushroom id.
            * On failure -> modal popup failure and say sorry.
        ?. TODO: When user settings are setup, check if user is already okay with providing
           location data, and it's toggled on (don't ask me again).
        ?. TODO: If it's their first time, show a modal that talks about why we want
           their location data.
        ?. TODO: If they accept, a couple things need to happen.
            * Location is fetched and assingned to variable.
           If they reject, location info is simply ignored. (undefined).
    */

const handleCapture = async (
  photoPath: string,
  photo: PhotoFile,
  userID: string,
  captureTime: string,
  dispatch: Dispatch,
) => {
  // Promise Chain
  const position = getCurrentPosition() as Promise<Location>;
  const modelData = shroomalyze(photo.path) as Promise<unknown>;
  const s3Response = getS3Response(userID) as Promise<S3LinkResponse>;

  // When all above promises are fulfilled, handle the combined data.
  Promise.all([position, modelData, s3Response]).then(
    (
      captureResolve: [
        resPos: Location,
        resModel: unknown,
        resS3: S3LinkResponse,
      ],
    ) => {
      const [resolvedPosition, resolvedModelData, resolvedS3Response] =
        captureResolve;
      console.log("Position: ", resolvedPosition);
      console.log("Mushroom: ", resolvedModelData);
      console.log("Key: ", resolvedS3Response);

      const [{ s3Key, uploadLink }] = resolvedS3Response.links;

      // Create new instance of capture.
      const instance = {
        dateFound: captureTime,
        latitude: resolvedPosition.latitude,
        longitude: resolvedPosition.longitude,
        location: resolvedPosition.location,
        s3Key: s3Key,
        imageLink: stripParamsFromLink(uploadLink),
      } as Instance;

      const captureID = buildCaptureIDFromShroomalysis(resolvedModelData);
      const captureInstance = {
        captureID: captureID,
        instances: [instance],
        // none of these should overwrite, right?
        notes: "",
        timesFound: 0,
        userID: userID,
      } as CaptureInstance;

      // doUploadImage(userID);
      handlePostCapture(
        userID,
        photo.path,
        captureInstance,
        uploadLink,
        dispatch,
      );

      // Now with the image uploaded, post the instance into database.
      doPostCaptures(userID, [captureInstance]).then(
        (postCaptureResponse: AxiosResponse) => {
          console.log("POST capture resposne: ", postCaptureResponse);
        },
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
  const userData = useSelector(
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
          title={"Capture"}
          onPress={() => {
            const time = new Date().toISOString();
            handleCapture(path, photo, userData, time, dispatch);
          }}
          varient={"primary"}
          size={"large"}
        />
        <AuxButton onPress={() => console.log("EDIT")} iconName={"layers"} />
        <AuxButton
          onPress={async () => {
            const fileName = createFileName(path);
            console.log(fileName);
            await RNFS.moveFile(
              `${path}`,
              `${RNFS.ExternalDirectoryPath}/${fileName}`,
            );
          }}
          iconName={"content-save"}
        />
      </View>
    </View>
  );
};

export default CaptureScreen;
