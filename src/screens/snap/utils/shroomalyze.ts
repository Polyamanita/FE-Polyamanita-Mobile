import { NativeModules } from "react-native";
// Function written from Native Java.
const ShroomalyzePlugin = NativeModules.Shroomalyze;

const MODEL_ACC_THRESHOLD = 0.6;

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
        const category = Object.keys(modelMessage).reduce((a, b) =>
          modelMessage[a] > modelMessage[b] ? a : b,
        );
        if (modelMessage[category] > MODEL_ACC_THRESHOLD) {
          resolve({ [category]: modelMessage[category] });
        } else {
          reject("model confidence threshold not met");
        }
      },
      (modelError: modelError) => {
        reject(modelError.error);
      },
    );
  });
}
