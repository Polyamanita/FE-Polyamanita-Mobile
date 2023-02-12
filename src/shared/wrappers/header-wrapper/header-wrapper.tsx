import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./header-wrapper.style";
import { View } from "react-native";
import HeaderContent from "./components/header-content";

interface HeaderWrapperProps {
  title: string;
  leftContent?: JSX.Element | JSX.Element[] | undefined;
  rightContent?: JSX.Element | JSX.Element[] | undefined;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  title,
  leftContent,
  rightContent,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <HeaderContent style={"leftContent"}>{leftContent}</HeaderContent>
        <Text h1 style={styles.title}>
          {title}
        </Text>
      </View>
      <HeaderContent style={"rightContent"}>{rightContent}</HeaderContent>
    </View>
  );
};

export default HeaderWrapper;
