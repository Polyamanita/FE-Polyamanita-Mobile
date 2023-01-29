import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./profile-modal.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface ProfileModalProps {}

const ProfileModal: React.FC<ProfileModalProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Proifle Modal
      </Text>
    </View>
  );
};

export default ProfileModal;
