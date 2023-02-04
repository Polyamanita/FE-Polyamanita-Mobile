import React from "react";
import { ParamListBase } from "@react-navigation/native";

/**
 * ? Local Imports
 */
import Header from "shared/wrappers/header-wrapper/header-wrapper";
import AuxButton from "@shared-components/button-aux/button-aux";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalContainer from "shared/wrappers/modal-wrapper/modal-wrapper";

interface BackButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}
interface ProfileModalProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const BackButton = ({ navigation }: BackButtonProps) => (
  <AuxButton iconName={"arrow-left-circle"} onPress={() => navigation.pop()} />
);

const ProfileModal: React.FC<ProfileModalProps> = ({
  navigation,
}: ProfileModalProps) => {
  // const theme = useTheme();
  // const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ModalContainer>
      <Header leftContent={<BackButton navigation={navigation} />} />
    </ModalContainer>
  );
};

export default ProfileModal;
