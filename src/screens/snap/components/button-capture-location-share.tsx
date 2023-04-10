import React from "react";
import AuxButton from "@shared-components/button-aux/button-aux";

interface LocationButtonProps {
  location: boolean;
  setLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationButton = ({
  location = false,
  setLocation,
}: LocationButtonProps) => (
  <AuxButton
    onPress={() => {
      // handle geolocation data
      setLocation(!location);
    }}
    iconName={location ? "earth" : "earth-off"}
  />
);

export default LocationButton;
