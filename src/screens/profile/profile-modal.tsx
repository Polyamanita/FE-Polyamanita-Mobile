import React from "react";
import { ParamListBase } from "@react-navigation/native";

/**
 * ? Local Imports
 */
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
import { queueRefetch } from "redux/actions/journal-actions";

interface ProfileModalProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

interface AccountSectionProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const AvatarPivot = () => {
  const pivotSize = 100;
  const userName = useSelector((store: ReduxStore) => store.userData.userName);
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
      <Text h1>{userName}</Text>
    </View>
  );
};

const ProfileStats = () => (
  <View style={{ backgroundColor: "red", height: 100 }}></View>
);

const ContentSection = () => (
  <SectionContainer
    label={localString.sectionHeaders.content}
    sectionAction={() => console.log("yes")}
  ></SectionContainer>
);
const PreferencesSection = () => (
  <SectionContainer
    label={localString.sectionHeaders.preferences}
  ></SectionContainer>
);
const AboutSection = () => (
  <SectionContainer label={localString.sectionHeaders.about}></SectionContainer>
);
const AccountSection = ({ navigation }: AccountSectionProps) => {
  const dispatch = useDispatch();
  return (
    <SectionContainer label={localString.sectionHeaders.account}>
      <View style={{ alignSelf: "flex-start" }}>
        <ButtonWrapper
          title={localString.logout}
          size={"small"}
          onPress={() => {
            dispatch(queueRefetch());
            navigation.popToTop();
          }}
        />
      </View>
    </SectionContainer>
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
      <ProfileStats />
      <ContentSection />
      <PreferencesSection />
      <AboutSection />
      <AccountSection navigation={navigation} />
    </ModalContainer>
  );
};

export default ProfileModal;
