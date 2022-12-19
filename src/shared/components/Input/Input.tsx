import React, { useState, useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./Input.style";
import { TextInput } from "react-native-gesture-handler";
import { Text, View } from "react-native";

// @params - status: string to change variation of component.
// @params - placeholder: Placeholder text inside the TextField.
// @params - subHeadingMessage: Message to provide user while typing into input.
interface InputProps {
  status?: string;
  placeholder?: string;
  subHeadingMessage?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Placeholder",
  subHeadingMessage,
  status,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  let statusIcon: string;
  let statusColor: any;

  switch (status) {
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

  // Subcomponents.
  const TextField = () => {
    // Ability to type in input.
    const [text, onChangeText] = useState("");

    return (
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary50}
        style={{
          ...styles.textfield,
          // If status there is a status, set width to 94%, makes room for icon.
          width: status ? "94%" : "100%",
        }}
      />
    );
  };

  // Subheading to provide user a message under the textfield.
  const SubHeading = () => {
    return (
      <Text
        style={{
          ...styles.subheading,
          color: statusColor,
          display: status ? "flex" : "none",
        }}
      >
        {subHeadingMessage}
      </Text>
    );
  };

  const Indicator = () => {
    return (
      <Icon
        style={{
          ...styles.indicator,
          color: statusColor,
          display: status ? "flex" : "none",
        }}
        name={statusIcon}
        type="MaterialCommunityIcons"
        size={28}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          ...styles.fieldWrapper,
          borderColor: status ? statusColor : styles.fieldWrapper.borderColor,
          borderWidth: status ? 2 : 1,
        }}
      >
        <TextField />
        <Indicator />
      </View>
      <SubHeading />
    </View>
  );
};

export default Input;
