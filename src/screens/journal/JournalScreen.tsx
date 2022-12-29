import React from "react";
import { View } from "react-native";
// import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
// import createStyles from "./JournalScreen.style";
import ListItem from "@shared-components/ListItem/ListItem";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";

interface JournalScreenProps {}

const JournalScreen: React.FC<JournalScreenProps> = () => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  const mockData = ["the", "cat", "dog", "house"];

  return (
    <ScreenContainer>
      <View style={{ width: "100%", height: "100%" }}>
        {mockData.map((e) => (
          <ListItem label={e} key={e} />
        ))}
      </View>
    </ScreenContainer>
  );
};

export default JournalScreen;
