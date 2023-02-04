import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./modal-wrapper.style";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";

interface ScreenWrapperProps {
  children?: JSX.Element | JSX.Element[] | undefined;
}

// This wrapper encloses screens that have a gradient background.
const ModalContainer: React.FC<ScreenWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  // const { colors } = theme;

  return (
    <View style={styles.container}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default ModalContainer;
