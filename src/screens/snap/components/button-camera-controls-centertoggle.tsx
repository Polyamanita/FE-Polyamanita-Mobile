import React from "react";
import AuxButton from "@shared-components/button-aux/button-aux";
import ControlButton from "../wrappers/camera-controls-button-wrapper";

interface FlashButtonProps {
  display: "flex" | "none";
  setDisplay: React.Dispatch<React.SetStateAction<"flex" | "none">>;
}

// This button just toggles the rule of thirds.
const GridButton = ({ display, setDisplay }: FlashButtonProps) => (
  <ControlButton>
    <AuxButton
      onPress={() => {
        setDisplay(display === "flex" ? "none" : "flex");
      }}
      iconName={display === "flex" ? "grid" : "grid-off"}
    />
  </ControlButton>
);

export default GridButton;
