import React, { useMemo } from "react";
import { View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
/**
 * ? Local Imports
 */
import createStyles from "./map-screen.style";
import { customMapStyle } from "./map-style";
import { captures, previewImage } from "api/mockMapData";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREENS } from "shared/constants/navigation-routes";

interface MapScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={customMapStyle}
        //specify our coordinates.
        initialRegion={{
          // UCF coords!
          latitude: 28.6016,
          longitude: -81.2005,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {captures.map((e, i) => (
          <Marker
            key={i}
            coordinate={
              { latitude: e.latitude, longitude: e.longitude } as LatLng
            }
            title={e.captureID}
            description={e.userID}
            onPress={() => {
              // Fake search API for now.
              navigation.push(SCREENS.IMAGE, { ...previewImage });
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
