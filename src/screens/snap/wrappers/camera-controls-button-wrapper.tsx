import React from "react";
import { View } from "react-native";

interface ControlButtonProps {
  children: JSX.Element | JSX.Element[] | undefined;
}

// Small wrapper to contain the camera controls on the snap screen.
const ControlButton: React.FC<ControlButtonProps> = ({
  children,
}: ControlButtonProps) => {
  return (
    <View style={{ alignSelf: "center", paddingHorizontal: 15 }}>
      {children}
    </View>
  );
};

export default ControlButton;
