import React, { useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./button-aux.style";
import { Pressable, PressableProps, ViewStyle } from "react-native";
import Avatar from "@shared-components/avatar/avatar";

// @params - onPress: when button is clicked what should be performed.
// @params - iconName: provides an icon for the button.
// @params - varient: Style choice of the button.
interface PolyButtonProps extends PressableProps {
  onPress: () => unknown;
  iconName: string;
  varient?: "default" | "glass" | "avatar";
}

const AuxButton: React.FC<PolyButtonProps> = ({
  onPress,
  iconName,
  varient = "default",
  ...rest
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  let styling = {} as ViewStyle;
  // Set different varients.
  switch (varient) {
    case "default":
      styling = { ...styles.variations.default, ...styles.icon.default };
      break;
    case "glass":
      styling = { ...styles.variations.glass, ...styles.icon.glass };
      break;
    case "avatar":
      styling = { ...styles.variations.avatar, ...styles.icon.avatar };
      break;
  }

  const iconSize = 40;

  return varient !== "avatar" ? (
    <Pressable style={styling} {...rest} onPress={onPress}>
      <Icon
        name={iconName}
        type="MaterialCommunityIcons"
        size={iconSize}
        color={colors.secondary100}
      />
    </Pressable>
  ) : (
    <Pressable style={styling} {...rest} onPress={onPress}>
      <Avatar wrapperSize={styling.height as number} />
    </Pressable>
  );
};

export default AuxButton;
