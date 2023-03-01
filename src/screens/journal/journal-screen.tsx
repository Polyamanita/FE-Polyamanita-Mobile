import React from "react";
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

interface JournalScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: any;
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  // TODO: get user captures from API
  const mock: Captures = [];
  for (let i = 0; i < 18; i++) {
    mock.push({
      captureID: "" + i,
      instances: [],
      notes: "hi",
      timesFound: i,
      userID: "0",
    });
  }

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
        {mock.map((capture) => (
          <Pressable
            key={capture.captureID}
            onPress={() => {
              navigation.navigate(SCREENS.MUSHROOM, { data: capture });
            }}
          >
            <ListItem label={capture.captureID} />
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

export default JournalScreen;
