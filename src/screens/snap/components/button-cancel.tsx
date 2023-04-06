import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/button-aux/button-aux";

interface CancelButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  pressable: boolean;
}

const CancelButton = ({ navigation, pressable = true }: CancelButtonProps) => (
  <AuxButton
    pressable={pressable}
    onPress={() => {
      navigation.pop();
    }}
    iconName={"close-circle"}
  />
);

export default CancelButton;
