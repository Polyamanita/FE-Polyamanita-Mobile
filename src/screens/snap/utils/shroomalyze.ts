import type { PhotoFile } from "react-native-vision-camera";

// BEAUTY AND MAGIC OF THE APP: Run the tensorflow model.
declare global {
  const __shroomalyze: (photo: PhotoFile) => unknown;
}
export function shroomalyze(photo: PhotoFile) {
  "worklet";
  return __shroomalyze(photo);
}