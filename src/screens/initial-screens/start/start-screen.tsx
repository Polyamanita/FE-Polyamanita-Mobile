import React from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/button-primary/button-primary";
import { SCREENS } from "shared/constants/navigation-routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useFocusEffect } from "@react-navigation/native";
import ScreenWrapper from "shared/wrappers/screen-wrapper/screen-wrapper";
import { localString } from "shared/localization";
import InitialAppWrapper from "../wrappers/initial-app-wrapper";
import { BackHandler } from "react-native";

interface StartScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  // Close the app on this screen.
  // Exit app effect.
  useFocusEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true; // needs to return true to make event listener happy.
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  });

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
