import RNFS from "react-native-fs";

const createFileName = (path: string): string => {
  const pathDirectories = path.split("/");
  // returns the <randomcode>.jpg filename
  return pathDirectories[pathDirectories.length - 1];
};

// Saves image to app directory on users phone.
export const saveImage = async (path: string) => {
  const fileName = createFileName(path);
  await RNFS.moveFile(`${path}`, `${RNFS.ExternalDirectoryPath}/${fileName}`);
};
