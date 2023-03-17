import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { ColorValue, Keyboard, Text, TextInputProps, View } from "react-native";
/**
 * ? Local Imports
 */
import createStyles from "./DigitInput.style";
import Icon from "react-native-dynamic-vector-icons";
import { InputHandler } from "shared/constants/interfaces";

interface DigitInputProps extends TextInputProps {
  inputHandler: InputHandler;
  // override inputHandler ref as this handles differently from input comp
  // ref?: React.MutableRefObject<any>
  placeholder?: string;
}

const DigitInput: React.FC<DigitInputProps> = ({
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

  const handleInput = (ev: string) => {
    let input = ev;
    const length = input.length - 1;
    if (input.charAt(length) == " " || input.charAt(length) == "-") {
      input = input.slice(0, -1);
    }
    inputHandler.setInput(input);

    // After each input, check if length is 4, if so, close the keyboard.
    if (input.length === 4) {
      Keyboard.dismiss();
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
        }}
      >
        {/* Input field */}
        <TextInput
          keyboardType={"decimal-pad"}
          textContentType={"none"}
          onChangeText={handleInput}
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
          value={inputHandler.input}
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

export default DigitInput;
