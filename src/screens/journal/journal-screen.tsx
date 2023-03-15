import React, { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
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
import { Captures } from "api/constants/journal";
import { doGetCaptures } from "api/requests";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";
import { extractShroomID } from "utils";
import { MUSHROOM_NAMES } from "shared/constants/mushroom-names";

interface JournalScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: any;
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  const [captures, setCaptures] = useState<Captures>([]);

  const userID = useSelector((store: ReduxStore) => store.userData.userID);
  useEffect(() => {
    doGetCaptures(userID).then((result) => {
      if (result.status === 200) {
        setCaptures(result.data.captures);
      }
    });
  }, [userID]);

  // TODO: organize capture list?
  const entries = captures.map((capture) => {
    const shroomID = extractShroomID(capture.captureID);
    const { common: shroomName } = MUSHROOM_NAMES[shroomID];

    return (
      <Pressable
        key={capture.captureID}
        onPress={() => {
          navigation.navigate(SCREENS.MUSHROOM, { capture });
        }}
      >
        <ListItem label={shroomName} />
      </Pressable>
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
            iconName={"help"}
            key={"huh1"}
          />,
          <AuxButton
            onPress={() => console.log("right")}
            iconName={"help"}
            key={"huh2"}
          />,
        ]}
      />
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {entries}
      </ScrollView>
    </ScreenContainer>
  );
};

export default JournalScreen;
