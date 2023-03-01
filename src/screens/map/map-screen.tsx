import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
/**
 * ? Local Imports
 */
import createStyles from "./map-screen.style";
import { customMapStyle } from "./map-style";

interface MapScreenProps {}

const MapScreen: React.FC<MapScreenProps> = () => {
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
      />
    </View>
  );
};

export default MapScreen;
