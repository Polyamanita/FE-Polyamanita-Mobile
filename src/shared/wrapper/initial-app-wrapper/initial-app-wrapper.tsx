import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./initial-app-wrapper.style";
import { localString } from "shared/localization";

interface InitialAppWrapperProps {
  title?: string;
  heading?: string;
  children: JSX.Element | JSX.Element[] | undefined;
}

const IntialAppWrapper: React.FC<InitialAppWrapperProps> = ({
  title,
  heading,
  children,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const titleDisplay = title ? "flex" : "none";
  return (
    <View style={styles.wrapper}>
      <View style={{ paddingVertical: 10 }}>
        <Image source={require("@assets/logo.jpg")} style={styles.logo} />
        <Text style={styles.appName}>{localString.appName}</Text>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ ...styles.title, display: titleDisplay }}>
            {title}
          </Text>
          <Text style={styles.heading}>{heading}</Text>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default IntialAppWrapper;
