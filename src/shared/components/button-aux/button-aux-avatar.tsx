import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/button-aux/button-aux";
import { SCREENSTACK } from "shared/constants/navigation-routes";

interface AvatarButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const AvatarButton = ({ navigation }: AvatarButtonProps) => {
  return (
    <AuxButton
      onPress={() => {
        navigation.navigate(SCREENSTACK.PROFILE);
      }}
      iconName={"mushroom"}
      varient={"avatar"}
    />
  );
};

export default AvatarButton;
