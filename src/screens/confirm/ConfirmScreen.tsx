import React from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase } from "@react-navigation/native";

interface ConfirmScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ navigation }) => {
  // TODO: will need these for confirmation type-in.
  // const [input, setInput] = useState("");
  // const ref = useRef(null);

  return (
    <ScreenContainer>
      <PreAppHeader title={"Confirmation"} />
      <>
        <Button
          title="Confirm"
          varient="primary"
          onPress={() => {
            navigation.popToTop();
            navigation.navigate(ZONES.APP, {});
          }}
          size="large"
        />
        <Button
          title="Cancel"
          onPress={() => {
            navigation.popToTop();
          }}
          size="small"
        />
      </>
    </ScreenContainer>
  );
};

export default ConfirmScreen;
