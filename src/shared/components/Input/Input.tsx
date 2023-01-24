import React, { useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import {
  ColorValue,
  NativeSyntheticEvent,
  Text,
  TextInputEndEditingEventData,
  TextInputProps,
  View,
} from "react-native";
/**
 * ? Local Imports
 */
import createStyles from "./Input.style";
import { InputHandler } from "shared/constants/models";
import { capitalizeWords } from "utils";

interface InputStyling {
  search?: boolean;
  placeholder?: string;
}

// @params - input: value to display in textfield, is updated onEndEditing.
// @params - setInput: useState function to update the input onEndEniting.
// @params - setStatus: useSate function to update status on input.
// @params - ref: A useRef context is needed to reference inputted values.
//                on enter or unfocus, the value will need to be saved to
//                some useState [x, setX] value.
// @params - search: if developer wants to implement a search input.
// @params - status: string to change variation of component.
// @params - placeholder: Placeholder text inside the TextField.
// @params - subHeadingMessage: Message to provide user while typing into input.
interface InputProps extends TextInputProps {
  inputHandler: InputHandler;
  styling?: InputStyling;
}

// Takes in a result from a check from utils.
// Based on return, will set the "status" style for input field.
const setStatusColor = (checkResult: boolean): string =>
  checkResult ? "confirm" : "warn";

const Input: React.FC<InputProps> = ({
  inputHandler,
  styling = {
    search: false,
    placeholder: "Placeholder",
  },
  ...rest
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  let statusIcon = "mushroom"; // idk why mushroom, but good debug icon. :d
  let statusColor: ColorValue;

  // Set different varients.
  switch (inputHandler.status) {
    case "confirm":
      statusIcon = "check-circle";
      statusColor = colors.positive;
      break;
    case "alert":
      statusIcon = "alert-circle";
      statusColor = colors.alert;
      break;
    case "warn":
      statusIcon = "close-circle";
      statusColor = colors.warning;
      break;
    default:
      statusColor = styles.fieldWrapper.borderColor as string;
      break;
  }

  // if search is enabled override icon to be a search icon.
  if (styling.search) {
    statusIcon = "magnify";
  }

  // Text field handling.
  const handleInput = (
    ev: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const input = ev.nativeEvent.text;
    inputHandler.setInput(input);
    if (inputHandler.checkMethods) {
      for (let i = 0; i < inputHandler.checkMethods.length; i++) {
        // If one of the check methods fails, provide user with warning.
        if (inputHandler.checkMethods[i].method(input) === false) {
          inputHandler.setStatus(setStatusColor(false));
          inputHandler.setFeedback(inputHandler.checkMethods[i].feedback);
          return;
        }
      }
      // Everything checked out!!
      inputHandler.setStatus(setStatusColor(true));
      inputHandler.setFeedback("");
      return;
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.fieldWrapper,
          borderColor: inputHandler.status
            ? statusColor
            : styles.fieldWrapper.borderColor,
          borderWidth: inputHandler.status ? 2 : 1,
          flexDirection: styling.search ? "row-reverse" : "row",
        }}
      >
        {/* Input field */}
        <TextInput
          onEndEditing={handleInput}
          defaultValue={inputHandler.input}
          // Default prop handling
          autoCapitalize={"none"}
          autoComplete={"off"}
          autoCorrect={false}
          // styling.
          placeholder={capitalizeWords(styling.placeholder ?? "")}
          placeholderTextColor={colors.secondary50}
          style={{
            ...styles.textfield,
            // If status there is a status, set width to 94%, makes room for icon.
            width: inputHandler.status || styling.search ? "94%" : "100%",
          }}
          {...rest}
        />

        {/* Status Icon */}
        <Icon
          style={{
            ...styles.indicator,
            color: !styling.search ? statusColor : colors.secondary78,
            display: inputHandler.status || styling.search ? "flex" : "none",
          }}
          name={statusIcon}
          type="MaterialCommunityIcons"
          size={28}
        />
      </View>

      {/* Subheading */}
      <Text
        style={{
          ...styles.subheading,
          color: statusColor,
          display: inputHandler.status ? "flex" : "none",
        }}
      >
        {inputHandler.feedback}
      </Text>
    </View>
  );
};

export default Input;
