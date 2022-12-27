import React from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase } from "@react-navigation/native";

interface InitialScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <PreAppHeader />
      <>
        <Button
          title="Sign Up"
          varient="primary"
          onPress={() => {
            navigation.navigate(SCREENS.SIGNUP, {});
          }}
          size="full"
        />
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate(SCREENS.SIGNIN, {});
          }}
          size="full"
        />
      </>
    </ScreenContainer>
  );
};

export default InitialScreen;
