import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./TestScreen.style";
import ListItem from "@shared-components/ListItem/ListItem";
import AuxButton from "@shared-components/AuxButton/AuxButton";

interface TestScreenProps {}

const TestScreen: React.FC<TestScreenProps> = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, paddingHorizontal: 15 }}
    >
      <>
        <ListItem label={"Item 1"} />
        <ListItem label={"Item 2"} />
        <ListItem label={"Item 3"} />
      </>
      <>
        <AuxButton
          onPress={() => console.log("Pressed")}
          iconName={"account"}
        />
      </>
    </ScrollView>
  );
};

export default TestScreen;
