import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
// ? Screens
import StartScreen from "@screens/initial-screens/start/start-screen";
import RegisterScreen from "@screens/initial-screens/register/register-screen";
import SigninScreen from "@screens/initial-screens/signin/signin-screen";
import ConfirmScreen from "@screens/initial-screens/confirm/confirm-screen";
import MapScreen from "@screens/map/map-screen";
import SnapScreen from "@screens/snap/snap-screen";
import CaptureScreen from "@screens/snap/capture-screen";
import JournalScreen from "@screens/journal/journal-screen";
import CommunityScreen from "@screens/community/community-screen";
import ProfileScreen from "@screens/profile/profile-modal";

const Stack = createStackNavigator();
// Function creates a Stack Navigator, that will later be nested inside a
// tab navigator.
// @parmas: screenName: How React Navigation can refer to the screen.
// @params: ScreenComponent: React Native Screen Componenet to assign.
const createTabStackNavigator = (
  ChildrenScreens?: JSX.Element[] | JSX.Element,
) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {ChildrenScreens}
    </Stack.Navigator>
  );
};

// Below are a set of stacks that control flow of navigation within a screen.
////////////////////////////////////////////////////////////////////////////

// This navigation stack contains signing in and registering related screens.
export const InitialStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.START} component={StartScreen} />
      <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={SCREENS.SIGNIN} component={SigninScreen} />
      <Stack.Screen name={SCREENS.CONFIRM} component={ConfirmScreen} />
    </Stack.Navigator>
  );
};

export const MapStack = () =>
  createTabStackNavigator([
    <Stack.Screen name={SCREENS.MAP} component={MapScreen} key={SCREENS.MAP} />,
  ]);

export const SnapStack = () =>
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

export const JournalStack = () =>
  createTabStackNavigator([
    <Stack.Screen
      name={SCREENS.JOURNAL}
      component={JournalScreen}
      key={SCREENS.JOURNAL}
    />,
  ]);

export const CommunityStack = () =>
  createTabStackNavigator([
    <Stack.Screen
      name={SCREENS.COMMUNITY}
      component={CommunityScreen}
      key={SCREENS.COMMUNITY}
    />,
  ]);

// Profile Stack unlike other Screen stacks, is only to provide context
// to the other stacks, this way we can access the profile "screen" on any
export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "red" },
        presentation: "card",
      }}
    >
      <Stack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        key={SCREENS.PROFILE}
        options={{
          presentation: "transparentModal",
        }}
      />
      ,
    </Stack.Navigator>
  );
};
