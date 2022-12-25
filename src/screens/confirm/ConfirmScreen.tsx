import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ConfirmScreen.style";
// import Input from "@shared-components/Input/Input";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { ZONES } from "@shared-constants";
import { StackNavigationProp } from "@react-navigation/stack";
import PreAppHeader from "@shared-components/PreAppHeader/PreAppHeader";

interface ConfirmScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const ConfirmScreen: React.FC<ConfirmScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // const [input, setInput] = useState("");
  // const ref = useRef(null);

  return (
    <View style={{ ...styles.container, paddingHorizontal: 15 }}>
      <PreAppHeader title={"Confirmation"} />
      <>
        <Button
          title="Confirm"
          varient="primary"
          onPress={() => {
            navigation.popToTop();
            navigation.navigate(ZONES.APP, {});
          }}
          size="large"
        />
        <Button
          title="Cancel"
          varient="primary-outline"
          onPress={() => {
            navigation.popToTop();
          }}
          size="small"
        />
      </>
    </View>
  );
};

export default ConfirmScreen;
