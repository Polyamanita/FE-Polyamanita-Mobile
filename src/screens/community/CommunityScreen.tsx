import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CommunityScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface CommunityScreenProps {}

const CommunityScreen: React.FC<CommunityScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Community
      </Text>
    </View>
  );
};

export default CommunityScreen;
