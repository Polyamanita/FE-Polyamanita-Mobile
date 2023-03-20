import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "shared/wrappers/header-wrapper/header-wrapper";
import AuxButton from "@shared-components/button-aux/button-aux";
import { StackNavigationProp } from "@react-navigation/stack";
import { localString } from "shared/localization";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";

interface ScreenWrapperProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  children?: JSX.Element | JSX.Element[] | undefined;
}

interface BackButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const BackButton = ({ navigation }: BackButtonProps) => (
  <AuxButton iconName={"arrow-left-circle"} onPress={() => navigation.pop()} />
);

// This wrapper encloses screens that have a gradient background.
const ModalContainer: React.FC<ScreenWrapperProps> = ({
  children,
  navigation,
}) => {
  // const theme = useTheme();
  // const styles = useMemo(() => createStyles(theme), [theme]);
  // const { colors } = theme;

  return (
    <ScreenContainer>
      <Header
        leftContent={<BackButton navigation={navigation} />}
        title={localString.profile}
      />
      <ScrollView>{children}</ScrollView>
    </ScreenContainer>
  );
};

export default ModalContainer;
