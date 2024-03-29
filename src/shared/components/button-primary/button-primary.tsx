import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./button-primary.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { PressableProps, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { capitalizeWords } from "utils";
import RNBounceable from "@freakycoder/react-native-bounceable";

// @params - action: when button is clicked what should be performed.
// @params - varient: Style choice of the button.
// @params - size: size varient, large or small.
interface PolyButtonProps extends PressableProps {
  title: string;
  onPress: () => unknown;
  varient?: "default" | "primary" | "primary-outline" | "glass";
  size?: "large" | "small" | "full";
  pressable?: boolean;
}

const ButtonWrapper: React.FC<PolyButtonProps> = ({
  title,
  onPress,
  varient = "default",
  size = "large",
  pressable = true,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  let styling = {} as ViewStyle;
  const gradient = [] as string[];
  // Set different varients.
  switch (varient) {
    case "default":
      styling = { ...styles.variations.default, ...styles.text.default };
      gradient.push(colors.primary38);
      gradient.push(colors.primary38);
      break;
    case "primary":
      styling = { ...styles.variations.primary, ...styles.text.primary };
      gradient.push(colors.primaryA);
      gradient.push(colors.primaryB);
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
    case "full":
      styling = { ...styling, ...styles.sizes.full };
  }

  // Precaution incase the string provided is not capitalized.
  const capitalizedTitle = capitalizeWords(title);
  const bounceyness = 0.8;
  return (
    <RNBounceable
      style={[{ backfaceVisibility: "hidden" }]}
      onPress={() => {
        if (pressable) onPress();
      }}
      bounceEffectIn={bounceyness}
    >
      <LinearGradient colors={gradient} style={styling}>
        <Text bold style={styles.text[varient]}>
          {capitalizedTitle}
        </Text>
      </LinearGradient>
    </RNBounceable>
  );
};

export default ButtonWrapper;
