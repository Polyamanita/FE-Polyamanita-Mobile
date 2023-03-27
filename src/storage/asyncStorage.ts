import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRUTHY } from "./constants";

export const storePermission = async (permissionType: string) => {
  try {
    // '1' for truthyness when user accepts the permission.
    await AsyncStorage.setItem(`@${permissionType}`, TRUTHY);
  } catch (e) {
    console.error(e);
  }
};

export const getPermission = async (permissionType: string) =>
  new Promise((resolve, reject) =>
    AsyncStorage.getItem(permissionType)
      .then((storageResolve) => {
        resolve(storageResolve);
      })
      .catch((storageReject) => reject(storageReject)),
  );
