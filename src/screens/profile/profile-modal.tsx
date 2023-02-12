import React from "react";
import { ParamListBase } from "@react-navigation/native";

/**
 * ? Local Imports
 */
import { StackNavigationProp } from "@react-navigation/stack";
import ModalContainer from "shared/wrappers/modal-wrapper/modal-wrapper";
import Avatar from "@shared-components/avatar/avatar";
import { View } from "react-native";
import SectionContainer from "shared/wrappers/section-wrapper/section-wrapper";
import { localString } from "shared/localization";

interface ProfileModalProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const AvatarPivot = () => {
  const pivotSize = 100;
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        marginVertical: 5,
      }}
    >
      <View
        style={{
          height: pivotSize,
          width: pivotSize,
          borderRadius: 1000,
        }}
      >
        <Avatar wrapperSize={pivotSize} />
      </View>
    </View>
  );
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  navigation,
}: ProfileModalProps) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ModalContainer navigation={navigation}>
      <AvatarPivot />
      <SectionContainer
        label={localString.sectionHeaders.content}
        sectionAction={() => console.log("yes")}
      ></SectionContainer>
    </ModalContainer>
  );
};

export default ProfileModal;
