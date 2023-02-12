import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AvatarButton from "@shared-components/button-aux/button-aux-avatar";
import HeaderWrapper from "shared/wrappers/header-wrapper/header-wrapper";

interface NavigationHeaderProps {
  title?: string;
  navigation: StackNavigationProp<ParamListBase, string>;
  rightContent?: JSX.Element | JSX.Element[];
}

// Component that acts like a stylized header when navigating through tabs.

const NavigationHeader = ({
  title,
  navigation,
  rightContent,
}: NavigationHeaderProps) => {
  return (
    <HeaderWrapper
      title={title ?? ""}
      leftContent={<AvatarButton navigation={navigation} />}
      rightContent={rightContent}
    />
  );
};

export default NavigationHeader;
