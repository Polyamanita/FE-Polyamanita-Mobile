import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ParamListBase, useTheme } from "@react-navigation/native";
import RNFS from "react-native-fs";
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

function getFileName(path: string): string {
  const pathDirectories = path.split("/");
  // returns the <randomcode>.jpg filename
  return pathDirectories[pathDirectories.length - 1];
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
          onPress={async () => {
            const fileName = getFileName(path);
            console.log(fileName);
            await RNFS.moveFile(
              `${path}`,
              `${RNFS.ExternalDirectoryPath}/${fileName}`,
            );
          }}
          iconName={"content-save"}
        />
      </View>
    </View>
  );
};

export default CaptureScreen;
