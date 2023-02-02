import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
/**
 * ? Local & Shared Imports
 */
import { SCREENSTACK } from "@shared-constants";
import { LightTheme, DarkTheme } from "@theme/themes";
import { createStackNavigator } from "@react-navigation/stack";
import { InitialStack } from "./stack-navigations";
import { TabNavigation } from "./tab-navigation";

const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENSTACK.INITIAL} component={InitialStack} />
        <Stack.Screen name={SCREENSTACK.APP} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
