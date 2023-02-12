import React, { useMemo, useRef, useState } from "react";
/**
 * ? Local Imports
 */
import { StackNavigationProp } from "@react-navigation/stack";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { ParamListBase, useTheme } from "@react-navigation/native";
import { View } from "react-native";
import DigitInput from "./components/DigitInput";
import createStyles from "./confirm-screen.style";
import { InputHandler } from "shared/constants/interfaces";
import { APPSECTIONS } from "shared/constants/navigation-routes";
import { localString } from "shared/localization";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import InitialAppWrapper from "../wrappers/initial-app-wrapper";

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
      <InitialAppWrapper
        title={localString.confirmation}
        heading={localString.initialStackHeaderMessages.confirmation}
      >
        <View style={styles.digitContainer}>
          <DigitInput
            inputHandler={handler}
            autoFocus={true}
            onEndEditing={handleDigitInput}
            onBlur={handleDigitInput}
          />
        </View>
        <CTAButton
          title={localString.register}
          onPress={() => {
            navigation.navigate(APPSECTIONS.APP);
          }}
        />
        <CancelButton navigation={navigation} />
      </InitialAppWrapper>
    </ScreenContainer>
  );
};

export default ConfirmScreen;
