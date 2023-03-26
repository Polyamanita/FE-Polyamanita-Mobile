import { NativeModules } from "react-native";
import { REJECT_CODE } from "../constants";
// Function written from Native Java.
const ShroomalyzePlugin = NativeModules.Shroomalyze;

const MODEL_ACC_THRESHOLD = 0;

export type modelResults = {
  [shroomID: string]: number;
};

type modelError = {
  error: string;
};

export async function shroomalyze(photoPath: string): Promise<modelResults> {
  return new Promise((resolve, reject) => {
    ShroomalyzePlugin.RunModel(
      photoPath,
      (modelMessage: modelResults) => {
        console.log(modelMessage);
        const category = Object.keys(modelMessage).reduce((a, b) =>
          modelMessage[a] > modelMessage[b] ? a : b,
        );

        console.log(category);
        if (modelMessage[category] > MODEL_ACC_THRESHOLD) {
          resolve({ [category]: modelMessage[category] });
        } else {
          // Just a way to indicate that the model failed to indetify anything.
          reject(REJECT_CODE);
        }
      },
      (modelError: modelError) => {
        reject(modelError.error);
      },
    );
  });
}
