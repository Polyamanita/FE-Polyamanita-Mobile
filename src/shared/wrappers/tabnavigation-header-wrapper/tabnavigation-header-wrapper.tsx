import React, { useMemo } from "react";
import { ParamListBase, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./tabnavigation-header-wrapper.style";
import { View } from "react-native";
import AuxButton from "@shared-components/button-aux/button-aux";
import { StackNavigationProp } from "@react-navigation/stack";
import { SCREENS } from "@shared-constants";

interface HeaderWrapperProps {
  title?: string;
  toggleAccountButton?: "flex" | "none";
  navigation: StackNavigationProp<ParamListBase, string>;
  children?: JSX.Element | JSX.Element[] | undefined;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  title,
  toggleAccountButton = "flex",
  navigation,
  children,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={{ display: toggleAccountButton }}>
          <AuxButton
            onPress={() => {
              navigation.navigate(SCREENS.COMMUNITY);
            }}
            iconName={"mushroom"}
          />
        </View>

        <Text h1 style={styles.title}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContent}>{children}</View>
    </View>
  );
};

export default HeaderWrapper;
