export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const regexMethods = {
  onlyLettersAndNumbers: (value: string) => /^[A-Za-z0-9]*$/.test(value),
  validEmailFormat: (value: string) =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  password: undefined, // TODO: NEED PASSWORD REGEX.
};
