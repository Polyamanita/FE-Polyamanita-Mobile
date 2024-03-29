import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaptureInstance, Instance } from "api/constants/journal";
import React, { useCallback, useMemo } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import NavigationHeader from "shared/components/header-tabnavigation/header-tabnavigation";
import { MUSHROOM_IDS } from "shared/constants/mushroom-names";
import { SCREENS } from "shared/constants/navigation-routes";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { extractShroomID } from "utils";
import createStyles from "./mushroom-screen.style";
import { useGetInstances, useUnmarkUnread } from "./utils";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface CountBoxProps {
  count: number;
  text: string;
  isLarge?: boolean;
}

interface GalleryProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  captureID: string;
  instances: Instance[];
}

interface InformationLinkProps {
  website: string;
  logo: JSX.Element;
  websiteRedirect: string;
  scientific: string;
}

interface InformationProps {
  scientific: string;
}

type MushroomScreenParams = {
  capture: CaptureInstance;
};

interface MushroomScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: MushroomScreenParams }, "params">;
}

const mockInstances: Instance[] = [
  {
    dateFound: "5 seconds ago",
    imageLink:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG/1200px-Amanita_muscaria_%28fly_agaric%29.JPG",
    latitude: 28.600989,
    location: "circle 1",
    longitude: -81.203842,
    s3Key: "lol1",
  },
  {
    dateFound: "10 seconds ago",
    imageLink: "https://www.nps.gov/muwo/learn/nature/images/4_20.jpg",
    latitude: 28.600618,
    location: "circle 2",
    longitude: -81.202811,
    s3Key: "lol2",
  },
  {
    dateFound: "15 seconds ago",
    imageLink:
      "https://www.gardenbythesea.org/site/assets/files/2583/mg_0296_amanita_mushroom_n_forest.jpg",
    latitude: 28.599326,
    location: "circle 3",
    longitude: -81.203701,
    s3Key: "lol3",
  },
  {
    dateFound: "20 seconds ago",
    imageLink:
      "https://images-stylist.s3-eu-west-1.amazonaws.com/app/uploads/2022/06/16151752/594_feat_mushrooms_digi_main.jpeg",
    latitude: 28.598124,
    location: "not a circle",
    longitude: -81.20111,
    s3Key: "lol3",
  },
];

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

const Gallery: React.FC<GalleryProps> = ({
  navigation,
  captureID,
  instances,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Get user's ID for image screens
  const userID = useSelector((store: ReduxStore) => store.userData.userID);

  return (
    <View style={styles.galleryContainer}>
      <View style={styles.galleryHeader}>
        <Text style={[styles.text, styles.galleryText]}>Gallery</Text>
        {/* <View style={[styles.box, styles.galleryViewBox]}>
          <Text style={[styles.text, styles.galleryViewText]}>View</Text>
        </View> */}
      </View>
      <View style={styles.galleryImages}>
        <ScrollView horizontal={true}>
          {instances.map((instance, i) => {
            const imageParams = {
              captureID,
              userID,
              instance,
            };
            return (
              <TouchableHighlight
                key={"galleryPic" + i}
                onPress={() => navigation.navigate(SCREENS.IMAGE, imageParams)}
              >
                <Image
                  source={{ uri: instance.imageLink }}
                  style={styles.galleryImage}
                />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const InformationLink: React.FC<InformationLinkProps> = ({
  website,
  logo,
  websiteRedirect,
  scientific,
}: InformationLinkProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const link = `${websiteRedirect}${scientific}`.toString();

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(`URL not working lmao: ${link}`);
    }
  }, [link]);

  return (
    <RNBounceable style={styles.informationLinkContainer} onPress={handlePress}>
      <View style={styles.informationLinkIcon}>{logo}</View>
      <Text style={[styles.text, styles.informationListText]}>{website}</Text>
    </RNBounceable>
  );
};

const Information: React.FC<InformationProps> = ({
  scientific,
}: InformationProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.informationContainer}>
      <View style={styles.informationHeader}>
        <Text style={[styles.text, styles.informationText]}>
          More Information
        </Text>
      </View>
      <InformationLink
        website={"Wikipedia"}
        logo={
          <Image
            source={require("@assets/external-web-logos/wikipedia.png")}
            style={styles.informationLinkIcon}
          />
        }
        websiteRedirect={"https://en.wikipedia.org/wiki/"}
        scientific={scientific}
      />
      <InformationLink
        website={"GBIF"}
        logo={
          <Image
            source={require("@assets/external-web-logos/gbif.jpg")}
            style={styles.informationLinkIcon}
          />
        }
        websiteRedirect={"https://www.gbif.org/search?q="}
        scientific={scientific}
      />
      <InformationLink
        website={"iNaturalist"}
        logo={
          <Image
            source={require("@assets/external-web-logos/inaturalist.png")}
            style={styles.informationLinkIcon}
          />
        }
        websiteRedirect={"https://www.inaturalist.org/search?q="}
        scientific={scientific}
      />
    </View>
  );
};

const MushroomScreen: React.FC<MushroomScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // const { capture: captureStub } = route.params;
  // const { captureID } = captureStub;
  // const { capture, loading } = useGetCaptureData(captureID);

  const {
    capture: { captureID, notes, timesFound },
  } = route.params;

  // Need to fetch from API again to get instances' image links :/
  const { loading, instances } = useGetInstances(captureID);
  const galleryInstances = instances ?? mockInstances;

  useUnmarkUnread(captureID);

  // Mushroom names
  const shroomID = extractShroomID(captureID);
  const { common, scientific } = MUSHROOM_IDS[shroomID];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 24 }}>
          <NavigationHeader navigation={navigation} title={"Journal"} />
        </View>
        <View style={{ paddingBottom: 12 }}>
          {/* TODO: get SVG of radial gradient and put it here */}
          <Image source={require("@assets/found.png")} style={styles.logo} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.text, styles.nameText]}>{common}</Text>
          <Text style={[styles.text, styles.sciNameText]}>{scientific}</Text>
        </View>
        <View style={styles.countBoxContainer}>
          {/* <CountBox count={timesFound} text="Personal" />
          <CountBox count={0} text="Total" isLarge={true} />
          <CountBox count={0} text="Region" /> */}
          <CountBox isLarge count={timesFound} text="Personal" />
        </View>
        {!loading && (
          <Gallery
            navigation={navigation}
            captureID={captureID}
            instances={galleryInstances}
          />
        )}
        <View style={styles.notesContainer}>
          <View style={styles.notesHeader}>
            <Text style={[styles.text, styles.galleryText]}>Notes</Text>
          </View>
          <View style={styles.notesBox}>
            <TextInput
              defaultValue={notes}
              multiline={true}
              style={[
                styles.text,
                {
                  textAlignVertical: "top",
                  padding: 0,
                  height: "100%",
                  marginHorizontal: 12,
                  marginTop: 12,
                },
              ]}
            />
          </View>
        </View>
        <Information scientific={scientific} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default MushroomScreen;
