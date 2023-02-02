import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/button-aux/button-aux";

interface CancelButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const CancelButton = ({ navigation }: CancelButtonProps) => (
  <AuxButton
    onPress={() => {
      navigation.pop();
    }}
    iconName={"close-circle"}
  />
);

export default CancelButton;
