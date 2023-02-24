import { NativeModules } from "react-native";

// Function written from Native Java.
const ShroomalyzePlugin = NativeModules.Shroomalyze;

export async function shroomalyze(photoPath: string) {
  return new Promise((resolve, reject) => {
    ShroomalyzePlugin.RunModel(photoPath,
      (modelMessage: unknown) => {
        resolve(modelMessage);
      },
      (modelError: unknown) => {
        reject(modelError);
      },
    );
  })
  
}
