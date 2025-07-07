import { useEffect, useState } from "react";

import { useColorScheme } from "@mui/material/styles";

import { FONTS_VALUES } from "../consts/siteConfig";

type TypeConfigs = {
  theme: string;
  font: string;
};
type LinkKey = keyof typeof FONTS_VALUES;

export function useConfigs() {
  const { setMode } = useColorScheme();
  const [configs, setConfigs] = useState<TypeConfigs>({
    theme: "light",
    font: "md",
  });

  const handleSet = (configs_: TypeConfigs) => {
    if (configs_.theme !== configs.theme) handleChangeTheme(configs_);
    if (configs_.font !== configs.font) handleFont(configs_);

    setConfigs(configs_);
  };

  const handleChangeTheme = (configs_: TypeConfigs) => {
    const theme_remove = configs_.theme === "dark" ? "light" : "dark";
    document.body.classList?.remove(theme_remove);
    document.body.classList?.add(configs_.theme);
    setMode(configs_.theme as "system" | "light" | "dark");

    localStorage.setItem("theme", configs_.theme);
  };

  const handleFont = (configs_: TypeConfigs) => {
    const fonts = FONTS_VALUES[configs_.font as LinkKey];
    Object.entries(fonts).forEach(([key, val]) => {
      document.documentElement.style.setProperty("--font-size-" + key, val);
    });
    localStorage.setItem("font", configs_.font);
  };

  useEffect(() => {
    const configs_ = structuredClone(configs);

    const theme_ = localStorage.getItem("theme");
    if (theme_ && theme_ === "dark") configs_.theme = theme_;

    const font_ = localStorage.getItem("font");
    if (font_ && font_ !== "md") configs_.font = font_;

    handleSet(configs_);
  }, []);

  return { value: configs, set: handleSet };
}
