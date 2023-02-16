export const createFileName = (path: string): string => {
  const pathDirectories = path.split("/");
  // returns the <randomcode>.jpg filename
  return pathDirectories[pathDirectories.length - 1];
};
