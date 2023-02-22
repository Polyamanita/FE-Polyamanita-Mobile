import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import RNFS from "react-native-fs";
import {
  fetchS3Key,
  getCurrentPosition,
  getUserInfo,
  shroomify,
} from "./utils/capture";
import { createFileName } from "./utils/save";
/**
 * ? Local Imports
 */
import createStyles from "./capture-screen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/button-aux/button-aux";
import Button from "@shared-components/button-primary/button-primary";
import SnapHeader from "./wrappers/header-snap-stack-wrapper";
import CancelButton from "./components/button-cancel";

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

const handleCapture = async (captureTime: Date) => {
  // Promise Chain
  const position = getCurrentPosition();
  const modelData = shroomify();
  const userInfo = getUserInfo();
  const s3Key = fetchS3Key();

  // When all above promises are fulfilled, handle the combined data.
  Promise.all([position, modelData, userInfo, s3Key]).then((responses) => {
    const [
      resolvedPosition,
      resolvedModelData,
      resolvedUserInfo,
      resolvedS3Key,
    ] = responses;
    console.log("Position: ", resolvedPosition);
    console.log("Mushroom: ", resolvedModelData);
    console.log("User: ", resolvedUserInfo);
    console.log("Key: ", resolvedS3Key);
  });

  console.log(captureTime);
};

const CaptureScreen: React.FC<CaptureScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  //  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // Passed from SnapScreen, contains image info.
  const { path, time } = route.params;

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
            console.log("CAPTURED!");
            handleCapture(time);
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
