import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import createStyles from "../header-wrapper.style";

interface HeaderContentProps {
  style: "leftContent" | "rightContent";
  children: JSX.Element | JSX.Element[] | undefined;
}

const HeaderContent = ({ style, children }: HeaderContentProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={styles[style]}>{children}</View>;
};

export default HeaderContent;
