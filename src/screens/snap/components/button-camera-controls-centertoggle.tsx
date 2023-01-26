import AuxButton from "@shared-components/button-aux/button-aux";
import ControlButton from "../wrappers/camera-controls-button-wrapper";

interface FlashButtonProps {
  display: "flex" | "none";
  setDisplay: React.Dispatch<React.SetStateAction<"flex" | "none">>;
}

const CenterButton = ({ display, setDisplay }: FlashButtonProps) => (
  <ControlButton>
    <AuxButton
      onPress={() => {
        setDisplay(display === "flex" ? "none" : "flex");
      }}
      iconName={
        display === "flex"
          ? "image-filter-center-focus-strong"
          : "image-filter-center-focus-strong-outline"
      }
    />
  </ControlButton>
);

export default CenterButton;
