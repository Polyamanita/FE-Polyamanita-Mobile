import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS, ZONES } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
import InitialScreen from "@screens/initial/InitialScreen";
import SignupScreen from "@screens/signup/SignupScreen";
import SigninScreen from "@screens/signin/SigninScreen";
import ConfirmScreen from "@screens/confirm/ConfirmScreen";
import MapScreen from "@screens/map/MapScreen";
import SnapScreen from "@screens/snap/SnapScreen";
import JournalScreen from "@screens/journal/JournalScreen";
import CommunityScreen from "@screens/community/CommunityScreen";
import TestScreen from "@screens/__testing/TestScreen";
import CaptureScreen from "@screens/capture/CaptureScreen";
// import TestScreen from "@screens/__testing/TestScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Function creates a Stack Navigator, that will later be nested inside a
// tab navigator.
// @parmas: screenName: How React Navigation can refer to the screen.
// @params: ScreenComponent: React Native Screen Componenet to assign.
function createTabStackNavigator(
  ChildrenScreens?: JSX.Element[] | JSX.Element,
) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {ChildrenScreens}
    </Stack.Navigator>
  );
}

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
const MapStack = () =>
  createTabStackNavigator([
    <Stack.Screen name={SCREENS.MAP} component={MapScreen} key={SCREENS.MAP} />,
  ]);
const SnapStack = () =>
  createTabStackNavigator([
    <Stack.Screen
      name={SCREENS.SNAP}
      component={SnapScreen}
      key={SCREENS.SNAP}
    />,
    <Stack.Screen
      name={SCREENS.CAPTURE}
      component={CaptureScreen}
      key={SCREENS.CAPTURE}
      options={
        {
          // TODO: Figure out why turing off animation creates navigation issue?
          // this disables the transition animation when taking a photo.
          // animationEnabled: false,
        }
      }
    />,
  ]);
const JournalStack = () =>
  createTabStackNavigator([
    <Stack.Screen
      name={SCREENS.JOURNAL}
      component={JournalScreen}
      key={SCREENS.JOURNAL}
    />,
  ]);
const CommunityStack = () =>
  createTabStackNavigator([
    <Stack.Screen
      name={SCREENS.COMMUNITY}
      component={CommunityScreen}
      key={SCREENS.COMMUNITY}
    />,
  ]);

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
      case SCREENS.COMMUNITY:
        iconName = focused ? "account" : "account-outline";
        break;
      case SCREENS.TEST:
        iconName = focused ? "test-tube" : "test-tube-empty";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon
        name={iconName}
        type="MaterialCommunityIcons"
        size={size}
        color={color}
      />
    );
  };

  /*  
    ####################
    #  TAB NAVIGATION  #
    #################### 
  */
  const TabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName={SCREENS.SNAP}
        screenOptions={({ route }) => ({
          headerShown: false,
          unmountOnBlur: true,
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
        <Tab.Screen
          name={SCREENS.SNAP}
          component={SnapStack}
          /* Wowie, check it out here: 
          https://medium.com/@mspviraj/hide-bottom-tab-bar-on-a-specific-screen-in-react-navigation-6-0-26d31625d339 */
          options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "";
              if (routeName === SCREENS.CAPTURE) {
                return { display: "none" };
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen name={SCREENS.JOURNAL} component={JournalStack} />
        <Tab.Screen name={SCREENS.COMMUNITY} component={CommunityStack} />
        <Tab.Screen name={SCREENS.TEST} component={TestScreen} />
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
        <Stack.Screen name={ZONES.PREAPP} component={PreStack} />
        <Stack.Screen name={ZONES.APP} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
