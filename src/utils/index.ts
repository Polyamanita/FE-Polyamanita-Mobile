export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const capitalizeWords = (string: string) => {
  let splitStr = string.split(" ");
  splitStr = splitStr.map((e) => capitalizeFirstLetter(e));
  return splitStr.join(" ");
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// TODO: do this once shroom IDs are figured out-ish
export const extractShroomID = (captureID: string): string => {
  // const extractedID = "idk" + captureID.substring(0, 0);
  const extractedID = captureID;
  return extractedID;
};
