import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import RNFS from "react-native-fs";
import Geolocation from "react-native-geolocation-service";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureScreen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/AuxButton/AuxButton";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import SnapHeader from "@screens/snap/components/SnapHeader";
import Header from "@shared-components/Header/Header";

interface CaptureScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}

function getFileName(path: string): string {
  const pathDirectories = path.split("/");
  // returns the <randomcode>.jpg filename
  return pathDirectories[pathDirectories.length - 1];
}

// Run the tensorflow model.
const shroomify = new Promise((resolve) => setTimeout(() => resolve(1), 3000));
// Grab info from localstorage.
const userInfo = new Promise((resolve) => setTimeout(() => resolve(2), 7500));
// Get the current position of the user.
const currentPosition = new Promise((resolve, reject) => {
  const positionOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 1000,
  } as Geolocation.GeoOptions;

  Geolocation.getCurrentPosition(
    (pos) => {
      // console.log(pos);
      resolve(pos);
    },
    (error) => {
      reject(error.message);
    },
    positionOptions,
  );
});

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

        Package the following for API.
         * Mushroom id as int 
         * image, as 8uint[] 
         * time as date object 
         * displayname as string
         * location as tuple (lat, long)
    */

const handleCapture = async (captureTime: Date) => {
  const position = currentPosition;
  const modelData = shroomify;
  const localUserInfo = userInfo;

  // When all above promises are fulfilled, handle the combined data.
  // TODO: should prob creat a dictionary to help indicate which promise is which instead of array.
  Promise.all([position, modelData, localUserInfo]).then((responses) =>
    responses.forEach((response) => console.log(response)),
  );

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
      <SnapHeader>
        <Header navigation={navigation} toggleAccountButton={"none"}>
          <AuxButton
            onPress={() => navigation.pop()}
            iconName={"close-circle"}
          />
        </Header>
      </SnapHeader>
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
            const fileName = getFileName(path);
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
