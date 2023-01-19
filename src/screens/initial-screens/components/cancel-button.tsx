import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { View } from "react-native";
import { localString } from "shared/localization";

interface CancelButtonProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const CancelButton = ({ navigation }: CancelButtonProps) => (
  <View style={{ paddingBottom: 10 }}>
    <Button
      title={localString.cancel}
      onPress={() => navigation.popToTop()}
      size="small"
    />
  </View>
);

export default CancelButton;
