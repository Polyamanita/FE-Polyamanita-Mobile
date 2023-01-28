import React from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import HeaderWrapper from "shared/wrappers/header-wrapper/header-wrapper";

interface SnapHeaderProps {
  rightContent: JSX.Element | JSX.Element[] | undefined;
  leftContnet: JSX.Element | JSX.Element[] | undefined;
}

// Consistant wrapper for the header on snap stack screens.
const SnapHeader: React.FC<SnapHeaderProps> = ({
  rightContent,
  leftContnet,
}: SnapHeaderProps) => {
  return (
    <View style={style.container}>
      <HeaderWrapper
        title={""}
        leftContent={leftContnet}
        rightContent={rightContent}
      />
    </View>
  );
};
const statusBarHeight = StatusBar.currentHeight;
const style = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: statusBarHeight,
    zIndex: 1000,
    paddingHorizontal: 15,
  } as ViewStyle,
});

export default SnapHeader;
