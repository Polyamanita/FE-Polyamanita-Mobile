import AuxButton from "@shared-components/button-aux/button-aux";

interface FlashButtonProps {
  flash: "on" | "off";
  setFlash: React.Dispatch<React.SetStateAction<"on" | "off">>;
}

const FlashButton = ({ flash, setFlash }: FlashButtonProps) => (
  <AuxButton
    onPress={() => {
      setFlash(flash === "on" ? "off" : "on");
    }}
    iconName={flash === "on" ? "flash" : "flash-outline"}
  />
);

export default FlashButton;
