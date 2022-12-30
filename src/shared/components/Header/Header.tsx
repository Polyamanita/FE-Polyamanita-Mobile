import React, { useMemo } from "react";
import { ParamListBase, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./Header.style";
import { View } from "react-native";
import AuxButton from "@shared-components/AuxButton/AuxButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREENS } from "@shared-constants";

interface PreAppHeaderProps {
  title?: string;
  navigation: StackNavigationProp<ParamListBase, string>;
  children?: JSX.Element | JSX.Element[] | undefined;
}

const Header: React.FC<PreAppHeaderProps> = ({
  title,
  navigation,
  children,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <AuxButton
          onPress={() => {
            navigation.navigate(SCREENS.COMMUNITY);
          }}
          iconName={"mushroom"}
        />
        <Text h1 style={styles.title}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContent}>{children}</View>
    </View>
  );
};

export default Header;
