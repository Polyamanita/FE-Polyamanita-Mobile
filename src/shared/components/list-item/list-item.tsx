import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./list-item.style";
import { Image, Text, View } from "react-native";

interface ListItemProps {
  label: string;
}

const ListItem: React.FC<ListItemProps> = ({ label }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.wrapper}>
      <Image source={require("@assets/logo.jpg")} style={styles.icon} />
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
    </View>
  );
};

export default ListItem;
