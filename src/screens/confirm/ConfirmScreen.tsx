import React, { useMemo, useRef, useState } from "react";
/**
 * ? Local Imports
 */
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { InputHandler, ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";
import ScreenContainer from "@shared-components/ScreenContainer/ScreenContainer";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { View } from "react-native";
import DigitInput from "./components/DigitInput";
import createStyles from "./ConfirmScreen.style";

interface ConfirmScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

// Mock auth code.
// const magicNumber = "3212";

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ navigation }) => {
  const reference = useRef(null);
  // Input states
  const [input, setInput] = useState<InputHandler["input"]>();
  const [valid, setValid] = useState<InputHandler["status"]>();
  const [feedback, setFeedback] = useState<InputHandler["feedback"]>();

  const handler = {
    input: input,
    setInput: setInput,
    status: valid,
    setStatus: setValid,
    ref: reference,
    feedback: feedback,
    setFeedback: setFeedback,
  } as InputHandler;

  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  function handleDigitInput() {
    setFeedback("Message to provide user");
    setValid("confirm");
  }

  return (
    <ScreenContainer>
      <PreAppHeader title={"Confirmation"} />
      <View style={styles.digitContainer}>
        <DigitInput
          inputHandler={handler}
          autoFocus={true}
          onEndEditing={handleDigitInput}
          onBlur={handleDigitInput}
        />
      </View>
      <View>
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
      </View>
    </ScreenContainer>
  );
};

export default ConfirmScreen;
