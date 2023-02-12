import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationHeader from "@shared-components/header-tabnavigation/header-tabnavigation";
import React from "react";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";

interface MushroomScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: any;
}

const MushroomScreen: React.FC<MushroomScreenProps> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <NavigationHeader navigation={navigation} title={"Journal"} />
    </ScreenContainer>
  );
};

export default MushroomScreen;
