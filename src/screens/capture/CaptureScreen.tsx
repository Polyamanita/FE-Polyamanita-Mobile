import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CaptureScreen.style";
import { StackNavigationProp } from "@react-navigation/stack";
import AuxButton from "@shared-components/AuxButton/AuxButton";
import Button from "@shared-components/ButtonWrapper/ButtonWrapper";
import SnapHeader from "@screens/snap/components/SnapHeader";
import Header from "@shared-components/Header/Header";

interface CaptureScreenProps {
  route: any;
  navigation: StackNavigationProp<ParamListBase, string>;
}

const CaptureScreen: React.FC<CaptureScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  //  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { path } = route.params;
  console.log("CAPUTRE SCREEN: ", JSON.stringify(path));

  return (
    <View style={styles.container}>
      <SnapHeader>
        <Header navigation={navigation} toggleAccountButton={"none"}>
          <AuxButton
            onPress={() => navigation.pop()}
            iconName={"close-circle"}
          />
        </Header>
      </SnapHeader>
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: `file://${path}` }}
      />
      <View
        style={{
          flexDirection: "row-reverse",
          paddingBottom: 10,
          paddingLeft: 5,
        }}
      >
        <Button
          title={"Capture"}
          onPress={() => console.log("CAPTURED!")}
          varient={"primary"}
          size={"large"}
        />
        <AuxButton onPress={() => console.log("EDIT")} iconName={"layers"} />
        <AuxButton
          onPress={() => console.log("SAVE")}
          iconName={"content-save"}
        />
      </View>
    </View>
  );
};

export default CaptureScreen;
