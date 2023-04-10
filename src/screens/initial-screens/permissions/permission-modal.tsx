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

interface PermissionModalProps {
  permissionFinalizer?: Permission[]; // Last element in the stack will receive the finalizer.
  navigation: unknown;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  permissionFinalizer,
}: PermissionModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <InitialAppWrapper>
        <View style={styles.permissionTextWrapper}>
          <Text h3 style={{ ...styles.text, paddingBottom: 15 }}>
            {localString.initialStackHeaderMessages.permissions}
          </Text>
          <Text h3 bold style={styles.text}>
            {localString.permissions.camera}
          </Text>
          <Text h3 bold style={styles.text}>
            {localString.permissions.location}
          </Text>
          <Text h3 bold style={styles.text}>
            {localString.permissions.files}
          </Text>
        </View>
        <View style={{ margin: 35 }}>
          <CTAButton
            title={localString.accept}
            onPress={() => {
              PermissionsAndroid.requestMultiple(
                permissionFinalizer as Permission[],
              )
                .then((_) => {
                  // Check if all were set to true.
                  navigation.navigate(APPSECTIONS.INITIAL as never); // typescript unhappy w/o as never.
                })
                .catch((rejectOnGivingPermissions) => {
                  console.error(
                    "Something really went wrong giving permissions.",
                    rejectOnGivingPermissions,
                  );
                });
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
