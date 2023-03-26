import React, { useMemo } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import createStyles from "./permission-modal-style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import InitialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenWrapper from "shared/wrappers/screen-wrapper/screen-wrapper";
import { View } from "react-native";
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
  permissionType: string;
  navigation: unknown;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  permissionCycle,
  permissionType,
}: PermissionModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // #region useState
  // const [permissionType, setPermissionType] = useState<string>("");
  // const [permissionProgress, setPermissionProgress] = useState<number>(1);

  const navigation = useNavigation();
  console.log(permissionCycle.position);

  return (
    <ScreenWrapper>
      <InitialAppWrapper>
        <View style={styles.permissionTextWrapper}>
          <Text h2 bold style={{ ...styles.text, paddingBottom: 5 }}>
            {permissionType}
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
                navigation.navigate(APPSECTIONS.INITIAL as never);
              } else {
                permissionCycle.setPosition(permissionCycle.position + 1);
                navigation.navigate(
                  permissionCycle.cycle[permissionCycle.position] as never,
                );
              }
            }}
          />
          <RNBounceable onPress={() => {
            // Alert the user that these are required.
          }}>
            <Text style={{...styles.rejectText}}>Reject</Text>
          </RNBounceable>
        </View>
      </InitialAppWrapper>
    </ScreenWrapper>
  );
};

export default PermissionModal;
