import React from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";

interface SnapHeaderProps {
  children: JSX.Element | JSX.Element[];
}

// Consistant wrapper for the header on snap stack screens.
const SnapHeader: React.FC<SnapHeaderProps> = ({ children }) => (
  <View style={style.container}>{children}</View>
);

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
