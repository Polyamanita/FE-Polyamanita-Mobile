import React, { useRef, useState } from "react";
/**
 * ? Local Imports
 */
import Input from "@shared-components/input/input";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { InputHandler } from "shared/constants/interfaces";
import { APPSECTIONS } from "shared/constants/navigation-routes";
import { localString } from "shared/localization";
import InputWrapper from "../wrappers/input-wrapper";
import CTAButton from "../components/button-cta";
import CancelButton from "../components/cancel-button";
import IntialAppWrapper from "../wrappers/initial-app-wrapper";
import ScreenContainer from "shared/wrappers/screen-wrapper/screen-wrapper";
import { handleSignin } from "../utils";
import { Session } from "api/auth";
import { useDispatch } from "react-redux";
import { updateUserID } from "redux/actions/account-actions";

interface SigninScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
}

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  const reference = useRef(null);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState("");

  const dispatch = useDispatch();

  // TODO: Repetitive code. Create a function to create this?
  const displayNameHandler = {
    input: displayName,
    setInput: setDisplayName,
    ref: reference,
  } as InputHandler;

  const passwordHandler = {
    input: password,
    setInput: setPassword,
    setStatus: setValidPassword,
    ref: reference,
    status: validPassword,
  } as InputHandler;

  return (
    <ScreenContainer>
      <IntialAppWrapper
        title={localString.signin}
        heading={localString.initialStackHeaderMessages.signin}
      >
        <InputWrapper>
          <Input
            inputHandler={displayNameHandler}
            styling={{
              placeholder: localString.username,
            }}
          />
          <Input
            inputHandler={passwordHandler}
            styling={{ placeholder: localString.password }}
            secureTextEntry={true}
          />
        </InputWrapper>
        <CTAButton
          title={localString.signin}
          onPress={() => {
            const credentials: Session = {
              // URGENT: resolve this
              email: displayName,
              password,
            };

            handleSignin(credentials).then((result) => {
              if (result.status === 200) {
                // Update user ID in Redux store
                dispatch(updateUserID(result.userID));
                navigation.push(APPSECTIONS.APP);
              } else {
                console.log;
              }
            });
            navigation.popToTop();
            navigation.push(APPSECTIONS.APP);
            // navigation.navigate(SCREENSTACK.APP);

            // else
            /* display message below password input why didnt work.
        invalid credientials, failed to reach server, etc.
        put this message by using the password message prop */
          }}
        />
        <CancelButton navigation={navigation} />
      </IntialAppWrapper>
    </ScreenContainer>
  );
};

export default SigninScreen;
