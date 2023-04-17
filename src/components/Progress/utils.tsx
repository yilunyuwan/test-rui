import { ThemeProps } from "../Icon/icon";

const ThemeArray = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
];

export const isThemeProps = (
  color: ThemeProps | string | undefined
): color is ThemeProps => {
  if (!color) return false;
  for (const themeString of ThemeArray) {
    if (color === themeString) return true;
  }
  return false;
};
