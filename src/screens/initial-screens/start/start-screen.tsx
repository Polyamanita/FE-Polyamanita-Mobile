import React from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { SCREENS } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import InitialAppWrapper from "@shared-wrapper/initial-app-wrapper/initial-app-wrapper";
import ScreenWrapper from "@shared-wrapper/screen-wrapper/screen-wrapper";
import { localString } from "shared/localization";

interface StartScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <InitialAppWrapper
        heading={localString.initialStackHeaderMessages.initial}
      >
        <Button
          title={localString.register}
          varient="primary"
          onPress={() => {
            navigation.navigate(SCREENS.REGISTER);
          }}
          size="full"
        />
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate(SCREENS.SIGNIN);
          }}
          size="full"
        />
      </InitialAppWrapper>
    </ScreenWrapper>
  );
};

export default StartScreen;
