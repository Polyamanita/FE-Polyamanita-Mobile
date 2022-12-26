import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./PreAppHeader.style";
import { Image, View } from "react-native";

interface PreAppHeaderProps {
  title?: string;
}

const PreAppHeader: React.FC<PreAppHeaderProps> = ({ title }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Image source={require("@assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.appTitle}>Polyamanita</Text>
      <Text style={{ ...styles.title, display: title ? "flex" : "none" }}>
        {title}
      </Text>
    </View>
  );
};

export default PreAppHeader;
