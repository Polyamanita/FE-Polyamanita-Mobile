import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigate, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { APPSECTIONS, SCREENSTACK } from "shared/constants/navigation-routes";
import { LightTheme, DarkTheme } from "@theme/themes";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { InitialStack, PermissionStack } from "./stack-navigations";
import { TabNavigation } from "./tab-navigation";
import ProfileModal from "@screens/profile/profile-modal";
import { checkAllPermissions } from "./utils";
import { permissionsToPass } from "./constants";

const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const profileStackOptions = {
    presentation: "transparentModal",
  } as StackNavigationOptions;

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  // When the app loads, we want to check if permissions have been granted.
  checkAllPermissions(permissionsToPass)
    .then((response) => {
      if (response === true) {
        navigate(APPSECTIONS.INITIAL);
      }
    })
    .catch((reject) => console.log(reject));

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={APPSECTIONS.PERMISSIONS}>
          {() => <PermissionStack navigationRef={navigationRef} />}
        </Stack.Screen>
        <Stack.Screen name={APPSECTIONS.INITIAL} component={InitialStack} />
        <Stack.Screen name={APPSECTIONS.APP} component={TabNavigation} />
        <Stack.Screen
          options={profileStackOptions}
          name={SCREENSTACK.PROFILE}
          component={ProfileModal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
