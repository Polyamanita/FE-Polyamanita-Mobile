import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ConfirmScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface JournalScreenProps {}

const ConfirmScreen: React.FC<JournalScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Confirmation
      </Text>
    </View>
  );
};

export default ConfirmScreen;
