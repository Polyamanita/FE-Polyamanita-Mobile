import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./list-item.style";
import { Image, Text, View } from "react-native";
import Icon from "react-native-dynamic-vector-icons";

interface ListItemProps {
  label: string;
  grayedOut: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ label, grayedOut = false }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.wrapper, grayedOut && styles.wrapperGrayed]}>
      {grayedOut ? (
        <View style={styles.icon}>
          <Icon
            name={"help-circle"}
            type="MaterialCommunityIcons"
            size={60}
            style={{ marginEnd: -5, start: -5, marginBottom: -5, top: -5 }}
          />
        </View>
      ) : (
        <Image source={require("@assets/logo.jpg")} style={styles.icon} />
      )}
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
    </View>
  );
};

export default ListItem;
