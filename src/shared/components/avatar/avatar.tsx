import React, { useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./avatar.style";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { ReduxStore } from "redux/store";

// @params - onPress: when button is clicked what should be performed.
// @params - iconName: provides an icon for the button.
// @params - varient: Style choice of the button.
interface AvatarProps {
  iconName: string;
  iconSize: number;
}

const Avatar: React.FC<AvatarProps> = ({ iconName, iconSize }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const userColors = useSelector(
    (store: ReduxStore) => store.userData.userData.colors,
  );
  console.log(userColors);
  return (
    <LinearGradient
      colors={userColors}
      useAngle={true}
      angle={0}
      style={styles.wrapper}
    >
      <Icon
        name={iconName}
        type="MaterialCommunityIcons"
        size={iconSize}
        color={colors.secondary100}
      />
    </LinearGradient>
  );
};

export default Avatar;
