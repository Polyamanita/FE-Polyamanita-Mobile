import React, { useMemo } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import createStyles from "./permission-modal-style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import InitialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenWrapper from "shared/wrappers/screen-wrapper/screen-wrapper";
import {
  Alert,
  BackHandler,
  Permission,
  PermissionsAndroid,
  View,
} from "react-native";
import { localString } from "shared/localization";
import CTAButton from "../components/button-cta";
import { APPSECTIONS } from "shared/constants/navigation-routes";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface PermissionCycle {
  cycle: string[];
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

interface PermissionModalProps {
  permissionCycle: PermissionCycle;
  permissionFinalizer?: Permission[]; // Last element in the stack will receive the finalizer.
  permissionHeader: string;
  navigation: unknown;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  permissionFinalizer,
  permissionCycle,
  permissionHeader,
}: PermissionModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <InitialAppWrapper>
        <View style={styles.permissionTextWrapper}>
          <Text h2 bold style={{ ...styles.text, paddingBottom: 5 }}>
            {permissionHeader}
          </Text>
          <Text h3 style={styles.text}>
            {localString.initialStackHeaderMessages.permissions}
          </Text>
        </View>
        <View style={{ margin: 35 }}>
          <CTAButton
            title={localString.accept}
            onPress={() => {
              // WHen all permissions are fulfilled.
              if (permissionCycle.position === permissionCycle.cycle.length) {
                // When the user is done accepting, set the following permissions.
                PermissionsAndroid.requestMultiple(
                  permissionFinalizer as Permission[],
                )
                  .then((_) => {
                    navigation.navigate(APPSECTIONS.INITIAL as never); // typescript unhappy w/o as never.
                  })
                  .catch((rejectOnGivingPermissions) => {
                    console.error(
                      "Something really went wrong giving permissions.",
                      rejectOnGivingPermissions,
                    );
                  });
              } else {
                permissionCycle.setPosition(permissionCycle.position + 1);
                navigation.navigate(
                  permissionCycle.cycle[permissionCycle.position] as never,
                );
              }
            }}
          />
          <RNBounceable
            onPress={() => {
              Alert.alert(
                "Are you sure you want to reject?",
                "Polyamanita requires all permissions to be accepted for the best possible user experience within the app. Are you sure you wish to reject?",
                [
                  {
                    text: "Reject",
                    onPress: () => BackHandler.exitApp(),
                    style: "cancel",
                  },
                  {
                    text: "Continue",
                  },
                ],
              );
            }}
          >
            <Text style={{ ...styles.rejectText }}>Reject</Text>
          </RNBounceable>
        </View>
      </InitialAppWrapper>
    </ScreenWrapper>
  );
};

export default PermissionModal;
