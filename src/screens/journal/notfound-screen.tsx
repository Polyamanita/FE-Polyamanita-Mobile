import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";
import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import NavigationHeader from "@shared-components/header-tabnavigation/header-tabnavigation";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";

import createStyles from "./notfound-screen-style";

type NotFoundScreenParams = {
  commonName: string;
};

interface NotFoundScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: NotFoundScreenParams }, "params">;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { commonName } = route.params;

  return (
    <ScreenContainer>
      <View style={{ paddingBottom: 24 }}>
        <NavigationHeader navigation={navigation} title={"Journal"} />
      </View>
      <View style={{ paddingBottom: 12 }}>
        {/* TODO: get SVG of radial gradient and put it here */}
        <Image source={require("@assets/found.png")} style={styles.logo} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.text, styles.nameText]}>{commonName}</Text>
        <Text style={[styles.text, styles.sciNameText]}>{"???"}</Text>
      </View>
      <View style={styles.notFoundContainer}>
        <Text style={[styles.text, styles.notFoundText]}>
          {"Hmm..."}
          {"\n"}
          {"You haven't captured this species yet!"}
        </Text>
      </View>
      <View style={styles.notFoundContainer}>
        <Text style={[styles.text, styles.notFoundText2]}>
          {"Check the map to see possible locations for this type of mushroom."}
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default NotFoundScreen;
