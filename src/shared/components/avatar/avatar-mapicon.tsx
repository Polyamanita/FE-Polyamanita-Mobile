import React, { useEffect, useMemo, useState } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./avatar.style";
import LinearGradient from "react-native-linear-gradient";
import { doGetUser } from "api/requests";
import { View } from "react-native";

// @params - onPress: when button is clicked what should be performed.
// @params - iconName: provides an icon for the button.
// @params - varient: Style choice of the button.
interface AvatarProps {
  userID: string;
  wrapperSize: number;
}

type Colors = [color1: string, color2: string];

// Reason for wrapper size as a prop is so that the avatar icon can be
// consistantly proportional to w/e container its going in.
const AvatarMapIcon: React.FC<AvatarProps> = ({ userID, wrapperSize }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [userColor, setUserColor] = useState<Colors>(["#000000", "#000000"]);
  const [iconVisability, setIconVisability] = useState<"flex" | "none">("none");

  useEffect(() => {
    doGetUser(userID).then((response) => {
      console.log(response.data);
      setUserColor([
        response.data.user.color1,
        response.data.user.color2,
      ] as Colors);

      setIconVisability("flex")
    });
  }, [userID]);

  const ratio = 0.75;
  return (
    <View style={{display: iconVisability}}>
      <LinearGradient
        colors={userColor}
        useAngle={true}
        angle={0}
        style={styles.wrapper}
      >
        <Icon
          name={"mushroom"}
          type="MaterialCommunityIcons"
          size={Math.ceil(wrapperSize * ratio)}
          color={colors.secondary100}
        />
      </LinearGradient>
    </View>
  );
};

export default AvatarMapIcon;
