import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./list-item.style";
import { Image, Text, View } from "react-native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import Icon from "react-native-dynamic-vector-icons";

interface ListItemProps {
  label: string;
  grayedOut: boolean;
  hasUnread: boolean;
  imageLink: string;
}

const ListItem: React.FC<ListItemProps> = ({
  label,
  grayedOut = false,
  hasUnread = false,
  imageLink = "",
}) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      style={[
        styles.wrapper,
        grayedOut && styles.wrapperGrayed,
        hasUnread && styles.wrapperUnread,
      ]}
    >
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
        <Image
          source={imageLink ? { uri: imageLink } : require("@assets/logo.jpg")}
          style={[styles.icon, hasUnread && styles.iconUnread]}
        />
      )}
      <Text numberOfLines={1} style={styles.text}>
        {label}
      </Text>
      {hasUnread && (
        <View
          style={{
            flexDirection: "row-reverse",
            flexGrow: 1,
          }}
        >
          <View style={{ start: "30%" }}>
            <TextWrapper style={[styles.text, styles.newText]}>
              NEW!
            </TextWrapper>
          </View>
        </View>
      )}
    </View>
  );
};

export default ListItem;
