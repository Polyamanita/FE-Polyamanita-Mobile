import React from "react";
import { useColorScheme, ViewStyle } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "shared/constants/navigation-routes";
import { palette } from "@theme/themes";
// ? Screen Stacks
import * as ScreenStack from "./stack-navigations";
import { TABLABELS } from "./constants";
import { localString } from "shared/localization";
import { useDispatch } from "react-redux";
import { loadUserData } from "redux/actions/account-actions";
import { TABBAR_HEIGHT } from "shared/constants/numeric-styling";

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
    case TABLABELS.MAP:
      iconName = focused ? "map-marker" : "map-marker-outline";
      break;
    case TABLABELS.SNAP:
      iconName = focused ? "camera" : "camera-outline";
      break;
    case TABLABELS.JOURNAL:
      iconName = focused ? "clipboard-text" : "clipboard-text-outline";
      break;
    case TABLABELS.COMMUNITY:
      iconName = focused ? "account" : "account-outline";
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

  const userDataDispatch = useDispatch();
  userDataDispatch(loadUserData());

  const tabBarStyle = {
    backgroundColor: isDarkMode ? palette.black : palette.white,
    height: TABBAR_HEIGHT,
  } as ViewStyle;

  return (
    <Tab.Navigator
      initialRouteName={TABLABELS.SNAP}
      backBehavior={"initialRoute"}
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route, focused, color, size),
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: tabBarStyle,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name={localString.tabBarLabels.map}
        component={ScreenStack.MapStack}
      />
      <Tab.Screen
        name={localString.tabBarLabels.snap}
        component={ScreenStack.SnapStack}
        /* Wowie, check it out here: 
          https://medium.com/@mspviraj/hide-bottom-tab-bar-on-a-specific-screen-in-react-navigation-6-0-26d31625d339 */
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === SCREENS.CAPTURE) {
              return { ...tabBarStyle, display: "none" };
            }
            return { ...tabBarStyle };
          })(route),
        })}
      />
      <Tab.Screen
        name={localString.tabBarLabels.journal}
        component={ScreenStack.JournalStack}
      />
      {/* <Tab.Screen
        name={localString.tabBarLabels.community}
        component={ScreenStack.CommunityStack}
      /> */}
    </Tab.Navigator>
  );
};
