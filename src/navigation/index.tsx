import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
import InitialScreen from "@screens/initial/InitialScreen";
import SignupScreen from "@screens/signup/SignupScreen";
import SigninScreen from "@screens/signin/SigninScreen";
import MapScreen from "@screens/map/MapScreen";
import SnapScreen from "@screens/snap/SnapScreen";
import JournalScreen from "@screens/journal/JournalScreen";
import FeedScreen from "@screens/feed/FeedScreen";
import ConfirmScreen from "@screens/confirm/ConfirmScreen";
// import TestScreen from "@screens/__testing/TestScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  // Renders tab icons and names.
  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "";
    switch (route.name) {
      case SCREENS.MAP:
        iconName = focused ? "map-marker" : "map-marker-outline";
        break;
      case SCREENS.SNAP:
        iconName = focused ? "camera" : "camera-outline";
        break;
      case SCREENS.JOURNAL:
        iconName = focused ? "clipboard-text" : "clipboard-text-outline";
        break;
      case SCREENS.FEED:
        iconName = focused ? "person" : "person-outline";
        break;
      case SCREENS.TEST:
        iconName = focused ? "beaker" : "beaker-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
  };

  /*  
    #######################
    #  STACK NAVIGATIONS  #
    #######################
  */

  // This navigation stack contains signing in and registering related stuff.
  const PreStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.INITIAL} component={InitialScreen} />
        <Stack.Screen name={SCREENS.SIGNIN} component={SigninScreen} />
        <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
        <Stack.Screen name={SCREENS.CONFIRM} component={ConfirmScreen} />
      </Stack.Navigator>
    );
  };

  const MapStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.MAP} component={MapScreen} />
      </Stack.Navigator>
    );
  };

  const SnapStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.SNAP} component={SnapScreen} />
      </Stack.Navigator>
    );
  };

  const JournalStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.JOURNAL} component={JournalScreen} />
      </Stack.Navigator>
    );
  };

  const FeedStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.FEED} component={FeedScreen} />
      </Stack.Navigator>
    );
  };

  /*  
    ####################
    #  TAB NAVIGATION  #
    #################### 
  */
  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName={SCREENS.SNAP}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.MAP} component={MapStack} />
        <Tab.Screen name={SCREENS.SNAP} component={SnapStack} />
        <Tab.Screen name={SCREENS.JOURNAL} component={JournalStack} />
        <Tab.Screen name={SCREENS.FEED} component={FeedStack} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"PREAPP"} component={PreStack} />
        <Stack.Screen name={"APP"} component={renderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
