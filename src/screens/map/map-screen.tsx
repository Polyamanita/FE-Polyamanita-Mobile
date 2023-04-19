import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
/**
 * ? Local Imports
 */
import createStyles from "./map-screen.style";
import { customMapStyle } from "./map-style";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREENS } from "shared/constants/navigation-routes";
import { getAllCaptures } from "./utils";
import { Captures } from "api/constants/journal";
import AvatarMapIcon from "@shared-components/avatar/avatar-mapicon";
import SnapHeader from "@screens/snap/wrappers/header-snap-stack-wrapper";
import AvatarButton from "@shared-components/button-aux/button-aux-avatar";
import { getCurrentPosition } from "utils";
import { Location } from "api/constants/location";
import { MUSHROOM_IDS } from "shared/constants/mushroom-names";

interface MapScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [allCaptures, setAllCaptures] = useState<Captures>([]);
  const [position, setPosition] = useState<Location>({
    latitude: 28.6016,
    longitude: -81.2005,
  } as Location);

  // #region useEffects
  // Get all captures from DB to show on map.
  useEffect(() => {
    getAllCaptures().then((result) => {
      if (result.status === 200) {
        // console.log(result.data.capture);
        setAllCaptures(result.data.capture);
      }
    });
  }, []);

  // // Get user location when component mounts.
  useEffect(() => {
    getCurrentPosition(true).then((result) => {
      setPosition(result as Location);
    });
  }, []);

  // #endregion.

  // Create array of capture points from flattened instances
  const capturePoints = allCaptures.flatMap((capture) =>
    capture.instances.map((instance) => {
      return {
        userID: capture.userID,
        captureID: capture.captureID,
        instance,
      };
    }),
  );

  const mapCaptures = capturePoints.filter(
    (capturePoint) => capturePoint.captureID in MUSHROOM_IDS,
  );
  // console.log(capturePoints); // good for logging if the map is constantly pinging for markers.
  return (
    <View style={styles.container}>
      <SnapHeader
        leftContnet={<AvatarButton navigation={navigation} />}
        rightContent={undefined}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        //specify our coordinates.
        region={{
          // UCF coords!
          ...position,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {mapCaptures.map((capturePoint, i) => (
          <Marker
            key={i}
            coordinate={
              {
                latitude: capturePoint.instance.latitude,
                longitude: capturePoint.instance.longitude,
              } as LatLng
            }
            // title={capturePoint.captureID}
            // description={capturePoint.userID}
            onPress={() => {
              // Fake search API for now.
              navigation.push(SCREENS.IMAGE, capturePoint);
            }}
          >
            <AvatarMapIcon userID={capturePoint.userID} wrapperSize={55} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
