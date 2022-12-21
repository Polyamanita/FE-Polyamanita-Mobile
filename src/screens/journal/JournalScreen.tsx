import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./JournalScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface JournalScreenProps {}

const JournalScreen: React.FC<JournalScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Journal
      </Text>
    </View>
  );
};

export default JournalScreen;
