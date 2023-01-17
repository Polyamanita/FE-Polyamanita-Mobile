import React, { useMemo } from "react";
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
import createStyles from "./DigitInput.style";
import Icon from "react-native-dynamic-vector-icons";
import { InputHandler } from "shared/constants/models";

interface DigitInputProps extends TextInputProps {
  inputHandler: InputHandler;
  // override inputHandler ref as this handles differently from input comp
  // ref?: React.MutableRefObject<any>
  placeholder?: string;
}

const Input: React.FC<DigitInputProps> = ({
  inputHandler,
  placeholder = "0000",
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

  // Text field handling.
  const handleInput = (
    ev: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    const input = ev.nativeEvent.text;
    inputHandler.setInput(input);
    // if (inputHandler.checkMethods) {
    //   for (let i = 0; i < inputHandler.checkMethods.length; i++) {
    //     // If one of the check methods fails, provide user with warning.
    //     if (inputHandler.checkMethods[i].method(input) === false) {
    //       inputHandler.setStatus(setStatusColor(false));
    //       inputHandler.setFeedback(inputHandler.checkMethods[i].feedback);
    //       return;
    //     }
    //   }
    //   // Everything checked out!!
    //   inputHandler.setStatus(setStatusColor(true));
    //   inputHandler.setFeedback("");
    //   return;
    // }
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
        }}
      >
        {/* Input field */}
        <TextInput
          keyboardType={"decimal-pad"}
          textContentType={"none"}
          onEndEditing={handleInput}
          defaultValue={inputHandler.input}
          // Default prop handling
          autoCapitalize={"none"}
          autoComplete={"off"}
          autoCorrect={false}
          // styling.
          placeholder={placeholder}
          placeholderTextColor={colors.secondary50}
          style={styles.textfield}
          maxLength={4}
          {...rest}
        />
      </View>
      {/* Subheading */}
      <View style={{ flexDirection: "row" }}>
        <Icon
          style={{
            ...styles.indicator,
            color: statusColor,
            display: inputHandler.status ? "flex" : "none",
          }}
          name={statusIcon}
          type="MaterialCommunityIcons"
          size={28}
        />
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
    </View>
  );
};

export default Input;
