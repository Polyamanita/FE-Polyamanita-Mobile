import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import NavigationHeader from "shared/components/header-tabnavigation/header-tabnavigation";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import createStyles from "./mushroom-screen.style";

type MushroomScreenParams = {
  data: string;
};

interface MushroomScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: MushroomScreenParams }, "params">;
}

interface CountBoxProps {
  count: number;
  text: string;
  isLarge?: boolean;
}

const CountBox: React.FC<CountBoxProps> = ({
  count,
  text,
  isLarge = false,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View
      style={[styles.box, styles.countBox, isLarge && styles.countBoxLarge]}
    >
      <Text style={[styles.text, styles.countBoxNumber]}>{count}</Text>
      <Text style={[styles.text, styles.countBoxText]}>{text}</Text>
    </View>
  );
};

const MushroomScreen: React.FC<MushroomScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data } = route.params;

  return (
    <ScreenContainer>
      <ScrollView>
        <View style={{ paddingBottom: 24 }}>
          <NavigationHeader navigation={navigation} title={"Journal"} />
        </View>
        <View style={{ paddingBottom: 12 }}>
          {/* TODO: get SVG of radial gradient and put it here */}
          <Image source={require("@assets/found.png")} style={styles.logo} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.text, styles.nameText]}>Magic mushroom</Text>
          <Text style={[styles.text, styles.sciNameText]}>
            Abracadabra amanita
          </Text>
        </View>
        <View style={styles.countBoxContainer}>
          <CountBox count={4} text="Personal" />
          <CountBox count={+data} text="Total" isLarge={true} />
          <CountBox count={534} text="Region" />
        </View>
        <View style={styles.galleryContainer}>
          <View style={styles.galleryHeader}>
            <Text style={[styles.text, styles.galleryText]}>Gallery</Text>
            <View style={[styles.box, styles.galleryViewBox]}>
              <Text style={[styles.text, styles.galleryViewText]}>View</Text>
            </View>
          </View>
          <View style={styles.galleryImages}>
            <></>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default MushroomScreen;
