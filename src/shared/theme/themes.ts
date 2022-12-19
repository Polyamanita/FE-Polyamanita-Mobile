import { DefaultTheme, ExtendedTheme } from "@react-navigation/native";

const primaryInk = "26, 32, 55";
const secondaryInk = "250, 251, 255";

export const palette = {
  primaryA: "rgba(229, 57, 129, 1.00)",
  primaryB: "rgba(229, 109, 102, 1.00)",
  backgroundA: "rgba(91, 86, 115, 1.00)",
  backgroundB: "rgba(17, 41, 46, 1.00)",
  fieldBackground: "rgba(244, 216, 242, 0.20)",
  disabled: "rgba(23, 26, 51, 1.00)",
  cameraElement: "rgba(67, 69, 89, 0.54)",
  positive: "rgba(29, 224, 175, 1.00)",
  warning: "rgba(251, 70, 115, 1.00)",

  // Dark font.
  primary100: "rgba(" + primaryInk + ", 1.00)",
  primary87: "rgba(" + primaryInk + ", 0.87)",
  primary54: "rgba(" + primaryInk + ", 0.54)",
  primary38: "rgba(" + primaryInk + ", 0.38)",
  primary24: "rgba(" + primaryInk + ", 0.24)",
  primary12: "rgba(" + primaryInk + ", 0.12)",
  primary6: "rgba(" + primaryInk + ", 0.06)",

  // Light font.
  secondary100: "rgba(" + secondaryInk + ", 1.00)",
  secondary78: "rgba(" + secondaryInk + ", 0.78)",
  secondary50: "rgba(" + secondaryInk + ", 0.50)",
  secondary24: "rgba(" + secondaryInk + ", 0.24)",
  secondary12: "rgba(" + secondaryInk + ", 0.12)",
  secondary6: "rgba(" + secondaryInk + ", 0.06)",

  // From boilerplate, this is just for reference for now.
  primary: "#0564d4",
  secondary: "#ff6a00",
  background: "#f6f8fa",
  white: "#fff",
  black: "#101214",
  button: "#1c1e21",
  shadow: "#757575",
  text: "#30363b",
  borderColor: "#d0d7de",
  borderColorDark: "#333942",
  placeholder: "#a1a1a1",
  danger: "rgb(208, 2, 27)",
  title: "rgb(102, 102, 102)",
  separator: "rgb(194, 194, 195)",
  highlight: "rgb(199, 198, 203)",
  blackOverlay: "rgba(0,0,0,0.6)",
  iconWhite: "#fff",
  iconBlack: "#101214",
  dynamicWhite: "#fff",
  dynamicBlack: "#1c1e21",
  dynamicBackground: "#fff",
  transparent: "transparent",
  calpyse: "#2b7488",
};

export const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
  },
};

export const DarkTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...LightTheme.colors,
    background: palette.black,
    foreground: palette.white,
    text: palette.white,
    tabBar: palette.black,
    iconWhite: palette.black,
    iconBlack: palette.white,
    dynamicBackground: palette.dynamicBlack,
    shadow: palette.transparent,
    borderColor: palette.borderColorDark,
  },
};
