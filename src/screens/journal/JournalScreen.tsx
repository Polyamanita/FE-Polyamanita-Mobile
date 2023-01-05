import React from "react";
import { ScrollView } from "react-native";
// import { useTheme } from "@react-navigation/native";

/**
 * ? Local Imports
 */
// import createStyles from "./JournalScreen.style";
import ListItem from "@shared-components/ListItem/ListItem";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import Header from "@shared-components/Header/Header";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import AuxButton from "@shared-components/AuxButton/AuxButton";

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
      <Header navigation={navigation} title={"Journal"}>
        <AuxButton onPress={() => console.log("left")} iconName={"huh"} />
        <AuxButton onPress={() => console.log("right")} iconName={"huh"} />
      </Header>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {mockData.map((e) => (
          <ListItem label={e} key={e} />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

export default JournalScreen;
