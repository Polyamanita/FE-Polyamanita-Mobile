import React, { useEffect, useMemo, useState } from "react";
import { ParamListBase, useTheme } from "@react-navigation/native";
import createStyles from "./profile-modal.style";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalContainer from "shared/wrappers/modal-wrapper/modal-wrapper";
import Avatar from "@shared-components/avatar/avatar";
import { View } from "react-native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SectionContainer from "shared/wrappers/section-wrapper/section-wrapper";
import { localString } from "shared/localization";
import ButtonWrapper from "@shared-components/button-primary/button-primary";
import { ReduxStore } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "api/constants/user";
import { handleSignout } from "./utils";

interface ProfileModalProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

interface AccountSectionProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

interface AvatarPivotProps {
  styles: any;
  username: string;
}

const AvatarPivot = ({ styles, username }: AvatarPivotProps) => {
  const pivotSize = 100;
  return (
    <View style={styles.avatarPivotContainer}>
      <View style={styles.avatarContainer}>
        <Avatar wrapperSize={pivotSize} />
      </View>
      <Text style={styles.username} h1 bold>
        {username}
      </Text>
    </View>
  );
};

// const ContentSection = () => (
//   <SectionContainer
//     label={localString.sectionHeaders.content}
//     sectionAction={() => console.log("yes")}
//   ></SectionContainer>
// );

// const PreferencesSection = () => (
//   <SectionContainer
//     label={localString.sectionHeaders.preferences}
//   ></SectionContainer>
// );
// const AboutSection = () => (
//   <SectionContainer label={localString.sectionHeaders.about}></SectionContainer>
// );

const AccountSection = ({ navigation }: AccountSectionProps) => {
  const dispatch = useDispatch();
  return (
    <SectionContainer label={localString.sectionHeaders.account}>
      <View style={{ alignSelf: "flex-start" }}>
        <ButtonWrapper
          title={localString.logout}
          size={"small"}
          onPress={() => handleSignout(navigation, dispatch)}
        />
      </View>
    </SectionContainer>
  );
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  navigation,
}: ProfileModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [userData, setUserData] = useState<UserData>();
  const reduxStoreUserData = useSelector((store: ReduxStore) => store.userData);
  useEffect(() => {
    setUserData(reduxStoreUserData);
  }, [reduxStoreUserData]);
  return (
    <ModalContainer navigation={navigation}>
      <AvatarPivot styles={styles} username={userData?.userName as string} />
      <Text
        h2
        style={styles.userstats}
      >{`Total Captures: ${userData?.TotalCaptures}`}</Text>
      {/* <ContentSection /> */}
      {/* <PreferencesSection /> */}
      {/* <AboutSection /> */}
      <AccountSection navigation={navigation} />
    </ModalContainer>
  );
};

export default ProfileModal;
