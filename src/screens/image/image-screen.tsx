import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./image-screen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SnapHeader from "@screens/snap/wrappers/header-snap-stack-wrapper";
import CancelButton from "@screens/snap/components/button-cancel";
import { extractShroomID } from "utils";
import { MUSHROOM_NAMES } from "shared/constants/mushroom-names";
import { Instance } from "api/constants/journal";
import { convertDateTime, useGetUsername } from "./utils";

type ImageScreenParams = {
  captureID: string;
  userID: string;
  instance: Instance;
};

interface ImageScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: ImageScreenParams }, "params">;
}

const ImageScreen: React.FC<ImageScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const { captureID, userID, instance } = route.params;
  const { dateFound, imageLink, location } = instance;

  const shroomID = extractShroomID(captureID);
  const { common, scientific } = MUSHROOM_NAMES[shroomID];

  const { loading, username } = useGetUsername(userID);

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <SnapHeader
            leftContnet={undefined}
            rightContent={<CancelButton navigation={navigation} />}
          />
          <Image style={StyleSheet.absoluteFill} source={{ uri: imageLink }} />
          <LinearGradient
            colors={["#00000000", colors.primary100]}
            locations={[0.66, 0.99, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* All UI elements go below, so they render ontop of gradient */}
          <View style={styles.infoContainer}>
            <View>
              <Text h2 bold color={colors.secondary100}>
                {common}
              </Text>
              <Text
                h2
                style={{ marginTop: -5, fontStyle: "italic" }}
                color={colors.secondary100}
              >
                {scientific}
              </Text>
            </View>

            <View style={{ paddingTop: 1 }}>
              <Text h3 color={colors.secondary100}>
                {username}
              </Text>
              <Text h3 color={colors.secondary100}>
                {location}
              </Text>
              <Text h3 color={colors.secondary100}>
                {convertDateTime(dateFound)}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ImageScreen;
