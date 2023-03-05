import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaptureInstance, Instance } from "api/constants/journal";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import NavigationHeader from "shared/components/header-tabnavigation/header-tabnavigation";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import createStyles from "./mushroom-screen.style";

interface CountBoxProps {
  count: number;
  text: string;
  isLarge?: boolean;
}

type MushroomScreenParams = {
  capture: CaptureInstance;
};

interface MushroomScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: MushroomScreenParams }, "params">;
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

  const { capture } = route.params;
  const { captureID, timesFound } = capture;

  const instances: Instance[] = [];

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
          {/* TODO: replace with shroom name once DB/API supports it */}
          <Text style={[styles.text, styles.sciNameText]}>{captureID}</Text>
        </View>
        <View style={styles.countBoxContainer}>
          <CountBox count={timesFound} text="Personal" />
          <CountBox count={0} text="Total" isLarge={true} />
          <CountBox count={0} text="Region" />
        </View>
        <View style={styles.galleryContainer}>
          <View style={styles.galleryHeader}>
            <Text style={[styles.text, styles.galleryText]}>Gallery</Text>
            <View style={[styles.box, styles.galleryViewBox]}>
              <Text style={[styles.text, styles.galleryViewText]}>View</Text>
            </View>
          </View>
          <View style={styles.galleryImages}>
            <ScrollView horizontal={true}>
              {instances.map((instance) => {
                return (
                  <Image
                    key={instance.imageLink}
                    source={{ uri: instance.imageLink }}
                    style={styles.galleryImage}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        {/* TODO: make thing for notes down here? */}
      </ScrollView>
    </ScreenContainer>
  );
};

export default MushroomScreen;
