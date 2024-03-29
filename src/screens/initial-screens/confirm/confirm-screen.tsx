import React, { useMemo, useRef, useState } from "react";
/**
 * ? Local Imports
 */
import { StackNavigationProp } from "@react-navigation/stack";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { ParamListBase, RouteProp, useTheme } from "@react-navigation/native";
import { View } from "react-native";
import DigitInput from "./components/DigitInput";
import createStyles from "./confirm-screen.style";
import { InputHandler } from "shared/constants/interfaces";
import { localString } from "shared/localization";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import InitialAppWrapper from "../wrappers/initial-app-wrapper";
import { confirmConfirmation, handleSignin, setupUser } from "../utils";
import { AuthUser, NewUser, Session } from "api/auth";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";

type ConfirmScreenParams = {
  user: AuthUser;
};

interface ConfirmScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: RouteProp<{ params: ConfirmScreenParams }, "params">;
}

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ route, navigation }) => {
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
  const newUser = route.params as unknown as AuthUser;
  const dispatch = useDispatch();
  return (
    <ScreenContainer>
      <InitialAppWrapper
        title={localString.confirmation}
        heading={localString.initialStackHeaderMessages.confirmation}
      >
        <View style={styles.digitContainer}>
          <DigitInput inputHandler={handler} autoFocus={true} />
        </View>
        <CTAButton
          title={localString.register}
          onPress={() => {
            confirmConfirmation({ ...newUser, code: input } as NewUser).then(
              (confirmationResult) => {
                console.log("Confirmation Result: ", confirmationResult.status);
                if (confirmationResult.status === 201) {
                  handler.setStatus("confirm");
                  // Shhhhh
                  handler.setFeedback("LETS GO, WELCOME!!");

                  // #region Now that the user is registered authentically, we can auto sign them in.
                  const signInCredentials: Session = {
                    email: newUser.email,
                    password: newUser.password,
                  };
                  // We will also want to save the usertoken to local storage here.
                  // HACKY way of doing it is just automatically sign them in here.
                  handleSignin(signInCredentials).then(
                    (signInResult: AxiosResponse) => {
                      setupUser(dispatch, signInResult, navigation, true);
                    },
                  );
                  // #endregion
                } else {
                  console.log(confirmationResult);
                  handler.setStatus("warn");
                  handler.setFeedback(confirmationResult.data["response"]);
                }
              },
            );
          }}
        />
        <CancelButton navigation={navigation} />
      </InitialAppWrapper>
    </ScreenContainer>
  );
};

export default ConfirmScreen;
