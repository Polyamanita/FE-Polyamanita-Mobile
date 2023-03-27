import React from "react";
import { ScrollView } from "react-native";
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

  const entries =
    !loading &&
    captures &&
    allShroomIDs.map((shroomID, i) => {
      const { common: shroomName } = MUSHROOM_IDS[shroomID];

      let onPress = () =>
        navigation.navigate(SCREENS.NOTFOUND, { commonName: shroomName });
      let label = shroomName;
      let grayedOut = true;

      if (shroomID in captures) {
        const capture = captures[shroomID];
        onPress = () => navigation.navigate(SCREENS.MUSHROOM, { capture });
        label = shroomName;
        grayedOut = false;
      }

      return (
        <RNBounceable key={i} onPress={onPress}>
          <ListItem label={label} grayedOut={grayedOut} />
        </RNBounceable>
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
