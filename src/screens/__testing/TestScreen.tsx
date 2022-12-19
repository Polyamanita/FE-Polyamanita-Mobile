import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./TestScreen.style";
import Input from "@shared-components/Input/Input";

interface TestScreenProps {}

const TestScreen: React.FC<TestScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="A warning message example."
        subHeadingMessage="Incorrect Info"
        statusColor={colors.warning}
        status={true}
      />
      <Input
        placeholder="Confirm message example."
        subHeadingMessage="Checks out."
        statusColor={colors.positive}
        status={true}
      />
      <Input
        placeholder="Username"
        subHeadingMessage="Username"
        status={false}
      />
      <Input
        placeholder="Password"
        subHeadingMessage="Password"
        status={false}
      />
    </ScrollView>
  );
};

export default TestScreen;
