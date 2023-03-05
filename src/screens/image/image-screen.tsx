import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";

interface ImageScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}
/**
 * ? Local Imports
 */
import createStyles from "./image-screen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SnapHeader from "@screens/snap/wrappers/header-snap-stack-wrapper";
import CancelButton from "@screens/snap/components/button-cancel";

interface ImageScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const ImageScreen: React.FC<ImageScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  const { dateFound, imageLink } = route.params;

  return (
    <View style={styles.container}>
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
            Magic Mushroom
          </Text>
          <Text
            h2
            style={{ marginTop: -5, fontStyle: "italic" }}
            color={colors.secondary100}
          >
            Abacadabara amanita
          </Text>
        </View>

        <View style={{ paddingTop: 1 }}>
          <Text h3 color={colors.secondary100}>
            Fun Guy
          </Text>
          <Text h3 color={colors.secondary100}>
            Orlando, FL
          </Text>
          <Text h3 color={colors.secondary100}>
            {dateFound}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ImageScreen;
