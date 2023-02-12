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
import { SCREENS } from "@shared-constants";

interface JournalScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const JournalScreen: React.FC<JournalScreenProps> = ({ navigation }) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  const mockData = [] as string[];
  for (let i = 0; i < 18; i++) {
    mockData.push(i.toString());
  }

  return (
    <ScreenContainer>
      <NavigationHeader
        navigation={navigation}
        title={"Journal"}
        rightContent={[
          <AuxButton
            onPress={() => console.log("left")}
            iconName={"huh"}
            key={"huh1"}
          />,
          <AuxButton
            onPress={() => console.log("right")}
            iconName={"huh"}
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
        {mockData.map((e) => (
          <Pressable
            key={e}
            onPress={() => {
              navigation.navigate(SCREENS.MUSHROOM);
            }}
          >
            <ListItem label={e} />
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

export default JournalScreen;
