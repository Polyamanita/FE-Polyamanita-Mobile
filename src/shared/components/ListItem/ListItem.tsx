import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ListItem.style";
import { Image, Text, View } from "react-native";

interface ListItemProps {
  label: string;
}

const Input: React.FC<ListItemProps> = ({ label }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Subcomponents.
  const ListText = () => {
    return (
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
    );
  };

  // Subheading to provide user a message under the textfield.
  const ListIcon = () => {
    return (
      <Image source={require("@assets/logo.jpg")} style={styles.icon}></Image>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ListIcon />
      <ListText />
    </View>
  );
};

export default Input;
