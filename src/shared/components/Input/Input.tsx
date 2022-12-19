import React, { useState, useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./Input.style";
import { TextInput } from "react-native-gesture-handler";
import { Text, View } from "react-native";

// @params - status: When true, subheading will display.
// @params - statusColor: Changes color to provide feedback for user.
// @params - placeholder: Placeholder text inside the TextField.
// @params - subHeadingMessage: Message to provide user while typing into input.
interface InputProps {
  status: boolean;
  statusColor?: string;
  placeholder?: string;
  subHeadingMessage?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  subHeadingMessage,
  status,
  statusColor,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const display = status ? "flex" : "none";
  const feedbackColor = statusColor ?? styles.fieldWrapper.borderColor;

  // Text input.
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
          // If status is true, set the width to 95% to make room for icon.
          width: status ? "94%" : "100%",
        }}
      />
    );
  };

  // Subheading to provide user a message under the textfield.
  const SubHeading = () => {
    return (
      <Text
        style={{ ...styles.subheading, color: feedbackColor, display: display }}
      >
        {subHeadingMessage}
      </Text>
    );
  };

  const Indicator = () => {
    return (
      <Icon
        style={{ ...styles.indicator, color: feedbackColor, display: display }}
        name={"home"}
        type="Ionicons"
        size={28}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={{ ...styles.fieldWrapper, borderColor: feedbackColor }}>
        <TextField />
        <Indicator />
      </View>
      <SubHeading />
    </View>
  );
};

export default Input;
