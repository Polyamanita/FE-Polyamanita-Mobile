import React, { useMemo } from "react";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./section-wrapper.style";
import { Pressable, View } from "react-native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { capitalizeFirstLetter } from "utils";

// sectionAction allows for something to happen when the entire section is tapepd.
interface SectionWrapperProps {
  children?: JSX.Element | JSX.Element[] | undefined;
  label?: string;
  sectionAction?: () => unknown;
}

// This wrapper encloses screens that have a gradient background.
const SectionContainer: React.FC<SectionWrapperProps> = ({
  children,
  label,
  sectionAction,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  // const { colors } = theme;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h2 style={styles.headerTitle}>
          {label ? capitalizeFirstLetter(label) : ""}
        </Text>
      </View>
      <Pressable onPressIn={sectionAction ?? undefined}>
        <View style={styles.sectionContent}>{children}</View>
      </Pressable>
    </View>
  );
};

export default SectionContainer;
