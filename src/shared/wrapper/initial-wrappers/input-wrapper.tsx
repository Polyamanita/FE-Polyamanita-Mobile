import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./input-wrapper.style";

interface InputWrapperProps {
  children: JSX.Element | JSX.Element[] | undefined;
}

// Wrapper for all components on a screen for the initial part of the app.
const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.wrapper}>{children}</View>;
};

export default InputWrapper;
