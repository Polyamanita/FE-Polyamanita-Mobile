import { Permission } from "react-native";
import { PERMISSION_TYPES } from "storage/constants";

// ? Screens
export const TABLABELS = {
  MAP: "Map",
  SNAP: "Snap",
  JOURNAL: "Journal",
  COMMUNITY: "Community",
};

// Setting up relation object for permissions array.
const ptypes = {
  camera: PERMISSION_TYPES.CAMERA,
  location: [PERMISSION_TYPES.LOCATION_COARSE, PERMISSION_TYPES.LOCATION_FINE],
  files: [PERMISSION_TYPES.READ_FILE, PERMISSION_TYPES.WRITE_FILE],
};

export const permissionsToPass = [
  ptypes.camera,
  ...ptypes.location,
  ...ptypes.files,
] as Permission[];
