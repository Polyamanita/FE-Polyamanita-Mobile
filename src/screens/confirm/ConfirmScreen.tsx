import React from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";

interface ConfirmScreenProps {
  navigation: StackNavigationProp<any, any>;
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
          varient="primary-outline"
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
