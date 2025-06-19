const { heroui } = require("@heroui/theme");
const plugin = require("tailwindcss/plugin");

const COLORS_CUSTOM = {
  custom1: {
    DEFAULT: "#FF8B00",
    1: "rgba(255, 153, 0, 1)",
    2: "rgba(255, 167, 0, 1)",
    3: "rgba(255, 181, 0, 1)",
    4: "rgba(255, 195, 0, 1)",
    5: "rgba(255, 209, 0, 1)",
    6: "rgba(255, 222, 0, 1)",
    7: "rgba(255, 236, 0, 1)",
    8: "rgba(255, 250, 0, 1)",
    9: "rgba(255, 255, 0, 1)",
    10: "rgba(255, 255, 0, 1)",
    "-9": "rgba(230, 125, 0, 1)",
    "-8": "rgba(204, 111, 0, 1)",
  },
  custom2: {
    DEFAULT: "#202355",
    1: "rgba(35, 39, 94, 1)",
    2: "rgba(38, 42, 102, 1)",
    3: "rgba(42, 46, 111, 1)",
    4: "rgba(45, 49, 119, 1)",
    5: "rgba(48, 53, 128, 1)",
    6: "rgba(51, 56, 136, 1)",
    7: "rgba(54, 60, 145, 1)",
    8: "rgba(58, 63, 153, 1)",
    9: "rgba(61, 67, 162, 1)",
    10: "rgba(64, 70, 170, 1)",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./z/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      minWidth: {
        screen: "100vw",
      },
      fontSize: {
        prima: "var(--font-size-primary)",
        second: "var(--font-size-secondary)",
        tert: "var(--font-size-tertiary)",
      },
      colors: { ...COLORS_CUSTOM },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: "var(--font-size-primary)",
          },
        },
      }),
    },
  },
  themes: {},
  darkMode: "class",
  important: true,
  plugins: [
    heroui(),
    plugin(function ({ addVariant }) {
      addVariant("navidad", ".navidad &");
    }),
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
    require("@tailwindcss/typography"),
  ],
};
