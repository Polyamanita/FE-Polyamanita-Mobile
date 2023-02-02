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
