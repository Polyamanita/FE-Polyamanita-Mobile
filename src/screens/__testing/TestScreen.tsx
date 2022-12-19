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
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, paddingHorizontal: 15 }}
    >
      <Input
        placeholder="A confirmation input example."
        subHeadingMessage="Confirmation"
        status="confirm"
      />
      <Input
        placeholder="An alert example."
        subHeadingMessage="Alert message."
        status="alert"
      />
      <Input
        placeholder="A warning message."
        subHeadingMessage="Warning message."
        status="warn"
      />
      <Input search={true} placeholder="Search... " />
      <Input placeholder="Username" subHeadingMessage="Username" />
      <Input placeholder="Password" subHeadingMessage="Password" />
    </ScrollView>
  );
};

export default TestScreen;
