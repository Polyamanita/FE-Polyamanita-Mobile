import React from "react";
import { ScrollView, View } from "react-native";
// import { useTheme } from "@react-navigation/native";

/**
 * ? Local Imports
 */
// import createStyles from "./JournalScreen.style";
import ListItem from "@shared-components/list-item/list-item";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import AuxButton from "@shared-components/button-aux/button-aux";
import NavigationHeader from "@shared-components/header-tabnavigation/header-tabnavigation";
import { SCREENS } from "shared/constants/navigation-routes";
// import { extractShroomID } from "utils";
import { MUSHROOM_IDS } from "shared/constants/mushroom-names";
import { useGetCaptures } from "./utils";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface JournalScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: any;
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  const { loading, captures } = useGetCaptures();
  const allShroomIDs = Object.keys(MUSHROOM_IDS);

  const entries = allShroomIDs.map((shroomID, i) => {
    const { common: shroomName } = MUSHROOM_IDS[shroomID];

    let onPress = () =>
      navigation.navigate(SCREENS.NOTFOUND, { commonName: shroomName });
    let grayedOut = true;
    let hasUnread = false;
    let imageLink = "";

    if (shroomID in captures) {
      const { isUnread, capture } = captures[shroomID];
      hasUnread = isUnread;
      onPress = () => navigation.navigate(SCREENS.MUSHROOM, { capture });
      grayedOut = false;
      // Get image link from last (most recent) instance
      [{ imageLink }] = capture.instances.slice(-1);
    }

    return (
      <View style={{ paddingBottom: 2 }} key={i}>
        <RNBounceable onPress={onPress}>
          <ListItem
            imageLink={imageLink}
            hasUnread={hasUnread}
            label={shroomName}
            grayedOut={grayedOut}
          />
        </RNBounceable>
      </View>
    );
  });

  return (
    <ScreenContainer>
      <NavigationHeader
        navigation={navigation}
        title={"Journal"}
        rightContent={[
          <AuxButton
            onPress={() => console.log("left")}
            iconName={"order-alphabetical-ascending"}
            key={"huh1"}
          />,
        ]}
      />
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {!loading && entries}
      </ScrollView>
    </ScreenContainer>
  );
};

export default JournalScreen;
