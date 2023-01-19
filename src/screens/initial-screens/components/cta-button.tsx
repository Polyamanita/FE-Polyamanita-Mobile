import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import { View } from "react-native";

interface CTAButtonProps {
  title: string;
  onPress: () => unknown;
}

const CTAButton = ({ title, onPress }: CTAButtonProps) => (
  <View style={{ paddingBottom: 10 }}>
    <Button title={title} varient="primary" onPress={onPress} size="large" />
  </View>
);

export default CTAButton;
