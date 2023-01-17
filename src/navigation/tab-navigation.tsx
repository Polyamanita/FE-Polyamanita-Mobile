import React from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { palette } from "@theme/themes";
// ? Screen Stacks
import * as ScreenStack from "./stack-navigations";

const Tab = createBottomTabNavigator();

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

export const TabNavigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.SNAP}
      backBehavior={"initialRoute"}
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
      <Tab.Screen name={SCREENS.MAP} component={ScreenStack.MapStack} />
      <Tab.Screen
        name={SCREENS.SNAP}
        component={ScreenStack.SnapStack}
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
      <Tab.Screen name={SCREENS.JOURNAL} component={ScreenStack.JournalStack} />
      <Tab.Screen
        name={SCREENS.COMMUNITY}
        component={ScreenStack.CommunityStack}
      />
    </Tab.Navigator>
  );
};
