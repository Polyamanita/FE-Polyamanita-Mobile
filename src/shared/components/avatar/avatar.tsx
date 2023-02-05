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
  wrapperSize: number;
}

// Reason for wrapper size as a prop is so that the avatar icon can be
// consistantly proportional to w/e container its going in.
const Avatar: React.FC<AvatarProps> = ({ wrapperSize }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const userAvatar = useSelector((store: ReduxStore) => store.userData.avatar);
  const ratio = 0.75;
  return (
    <LinearGradient
      colors={userAvatar.colors}
      useAngle={true}
      angle={0}
      style={styles.wrapper}
    >
      <Icon
        name={userAvatar.iconName}
        type="MaterialCommunityIcons"
        size={Math.ceil(wrapperSize * ratio)}
        color={colors.secondary100}
      />
    </LinearGradient>
  );
};

export default Avatar;
