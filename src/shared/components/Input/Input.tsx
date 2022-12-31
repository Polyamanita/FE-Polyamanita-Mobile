import React, { useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./Input.style";
import { TextInput } from "react-native-gesture-handler";
import {
  ColorValue,
  NativeSyntheticEvent,
  Text,
  TextInputEndEditingEventData,
  TextInputProps,
  View,
} from "react-native";

interface InputStyling {
  search?: boolean;
  status?: string;
  placeholder?: string;
  subHeadingMessage?: string;
}

// @params - input: value to display in textfield, is updated onEndEditing.
// @params - setInput: useState function to update the input onEndEniting.
// @params - ref: A useRef context is needed to reference inputted values.
//                on enter or unfocus, the value will need to be saved to
//                some useState [x, setX] value.
// @params - search: if developer wants to implement a search input.
// @params - status: string to change variation of component.
// @params - placeholder: Placeholder text inside the TextField.
// @params - subHeadingMessage: Message to provide user while typing into input.
interface InputProps extends TextInputProps {
  typedText: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  ref: React.MutableRefObject<null>;
  styling?: InputStyling;
}

const Input: React.FC<InputProps> = ({
  typedText,
  setInput,
  ref,
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
  switch (styling.status) {
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
    setInput(input);
    console.log(input);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.fieldWrapper,
          borderColor: styling.status
            ? statusColor
            : styles.fieldWrapper.borderColor,
          borderWidth: styling.status ? 2 : 1,
          flexDirection: styling.search ? "row-reverse" : "row",
        }}
      >
        {/* Input field */}
        <TextInput
          // Handle input from user.
          ref={ref}
          onEndEditing={handleInput}
          defaultValue={typedText}
          // Default prop handling
          autoCapitalize={"none"}
          autoComplete={"off"}
          autoCorrect={false}
          // styling.
          placeholder={styling.placeholder}
          placeholderTextColor={colors.secondary50}
          style={{
            ...styles.textfield,
            // If status there is a status, set width to 94%, makes room for icon.
            width: styling.status || styling.search ? "94%" : "100%",
          }}
          {...rest}
        />

        {/* Status Icon */}
        <Icon
          style={{
            ...styles.indicator,
            color: !styling.search ? statusColor : colors.secondary78,
            display: styling.status || styling.search ? "flex" : "none",
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
          display: styling.status ? "flex" : "none",
        }}
      >
        {styling.subHeadingMessage}
      </Text>
    </View>
  );
};

export default Input;
