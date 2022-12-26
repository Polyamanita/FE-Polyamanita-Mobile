import React, { useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./TestScreen.style";
import Input from "@shared-components/Input/Input";
import ListItem from "@shared-components/ListItem/ListItem";

interface TestScreenProps {}

const TestScreen: React.FC<TestScreenProps> = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [input2, setInput2] = useState("");
  const [input, setInput] = useState("");
  const ref = useRef(null);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, paddingHorizontal: 15 }}
    >
      <Input
        input={input}
        setInput={setInput}
        ref={ref}
        placeholder="Username"
        status=""
      />
      <Input
        input={input2}
        setInput={setInput2}
        ref={ref}
        placeholder="Password"
        status="alert"
        subHeadingMessage="Alert"
      />
      <>
        <ListItem label={"Item 1"} />
        <ListItem label={"Item 2"} />
        <ListItem label={"Item 3"} />
      </>
    </ScrollView>
  );
};

export default TestScreen;
