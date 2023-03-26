import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";

interface NotFoundScreenProps {
  navigation: StackNavigationProp<ParamListBase, string>;
  route: any;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = () => {
  return (
    <View>
      <></>
    </View>
  );
};

export default NotFoundScreen;
