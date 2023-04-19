import React, { useMemo } from "react";
import { BackHandler, Image, StyleSheet, View } from "react-native";
import {
  ParamListBase,
  RouteProp,
  useFocusEffect,
  useTheme,
} from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./post-capture.style";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SnapHeader from "@screens/snap/wrappers/header-snap-stack-wrapper";
import { extractShroomID } from "utils";
import { MUSHROOM_IDS } from "shared/constants/mushroom-names";
import { Instance } from "api/constants/journal";
import { convertDateTime } from "./utils";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import AuxButton from "@shared-components/button-aux/button-aux";

type PostCaptureScreenParams = {
  captureID: string;
  instance: Instance;
  photoPath: string;
};

interface PostCaptureScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: PostCaptureScreenParams }, "params">;
}

const PostCaptureScreen: React.FC<PostCaptureScreenProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const userName = useSelector((store: ReduxStore) => store.userData.userName);

  const { captureID, instance, photoPath } = route.params;
  const { dateFound, location } = instance;

  const shroomID = extractShroomID(captureID);
  const { common, scientific } = MUSHROOM_IDS[shroomID];

  const photoURI = `file://${photoPath}`;

  // Exit app effect.
  useFocusEffect(() => {
    const backAction = () => {
      navigation.pop();
      navigation.pop();
      return true; // needs to return true to make event listener happy.
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <SnapHeader
        leftContnet={undefined}
        rightContent={
          <AuxButton
            onPress={() => {
              navigation.pop();
              navigation.pop();
            }}
            iconName={"close-circle"}
          />
        }
      />
      <Image style={StyleSheet.absoluteFill} source={{ uri: photoURI }} />
      <LinearGradient
        colors={["#00000000", colors.primary100]}
        locations={[0.66, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* All UI elements go below, so they render ontop of gradient */}
      <View style={styles.infoContainer}>
        <View>
          <Text h2 bold color={colors.secondary100}>
            {common}
          </Text>
          <Text
            h3
            style={{ marginTop: -5, fontStyle: "italic" }}
            color={colors.secondary100}
          >
            {scientific}
          </Text>
        </View>

        <View style={{ paddingTop: 16 }}>
          <Text h3 color={colors.secondary100}>
            {userName}
          </Text>
          <Text h4 color={colors.secondary100}>
            {location}
          </Text>
          <Text h4 color={colors.secondary100}>
            {convertDateTime(dateFound)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCaptureScreen;
