import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./Button.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Pressable, PressableProps, ViewStyle } from "react-native";

// @params - action: when button is clicked what should be performed.
// @params - varient: Style choice of the button.
// @params - size: size varient, large or small.
interface PolyButtonProps extends PressableProps {
  title: string;
  varient: string;
  size?: string;
}

const PolyButton: React.FC<PolyButtonProps> = ({
  title = "Click Me!",
  varient = "default",
  size = "large",
  ...rest
}) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  let styling = {} as ViewStyle;
  // Set different varients.
  switch (varient) {
    case "default":
      styling = { ...styles.variations.default, ...styles.text.default };
      break;
    case "primary":
      styling = { ...styles.variations.primary, ...styles.text.primary };
      break;
    case "primary-outline":
      styling = {
        ...styles.variations.primaryOutline,
        ...styles.text.primaryOutline,
      };
      break;
    case "glass":
      break;
  }

  // Set size
  switch (size) {
    case "small":
      styling = { ...styling, ...styles.sizes.small };
      break;
    case "large":
      styling = { ...styling, ...styles.sizes.large };
      break;
  }

  return (
    <Pressable style={styling} {...rest}>
      <Text bold style={{ ...styles.text[varient] }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default PolyButton;
