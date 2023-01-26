import AuxButton from "@shared-components/button-aux/button-aux";
import ControlButton from "../wrappers/camera-controls-button-wrapper";

interface FlashButtonProps {
  flash: "on" | "off";
  setFlash: React.Dispatch<React.SetStateAction<"on" | "off">>;
}

const FlashButton = ({ flash, setFlash }: FlashButtonProps) => (
  <ControlButton>
    <AuxButton
      onPress={() => {
        setFlash(flash === "on" ? "off" : "on");
      }}
      iconName={flash === "on" ? "flash" : "flash-outline"}
    />
  </ControlButton>
);

export default FlashButton;
