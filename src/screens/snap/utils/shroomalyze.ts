import { NativeModules } from "react-native";

// Function written from Native Java.
const ShroomalyzePlugin = NativeModules.Shroomalyze;

export async function shroomalyze() {
  ShroomalyzePlugin.sayTest(
    (err: unknown) => {
      console.log(err);
    },
    (msg: unknown) => {
      console.log(msg);
    },
  );
}
