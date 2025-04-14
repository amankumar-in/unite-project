import type { Config } from "tailwindcss";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} from "./src/styles/design-tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      sans: typography.fontFamily.sans,
      mono: typography.fontFamily.mono,
    },
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
    borderRadius,
    boxShadow: shadows,
    spacing,
    extend: {},
  },
  darkMode: "class", // 'media' or 'class'
  plugins: [],
};

export default config;
