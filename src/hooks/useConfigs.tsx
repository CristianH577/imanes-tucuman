import { useEffect, useRef, useState } from "react";

import { useColorScheme } from "@mui/material/styles";

import { FONTS_VALUES } from "../consts/siteConfig";

type TypeConfigs = {
  theme: string;
  font: string;
};
type TypeFont = keyof typeof FONTS_VALUES;

const channel = new BroadcastChannel("configs");

export function useConfigs() {
  const { setMode } = useColorScheme();
  const firstRender = useRef(true);

  const [configs, setConfigs] = useState<TypeConfigs>({
    theme: localStorage.getItem("theme") || "light",
    font: localStorage.getItem("font") || "md",
  });

  const applyTheme = (theme: string) => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    setMode(theme as "light" | "dark" | "system");
  };
  const applyFont = (font: string) => {
    const fonts = FONTS_VALUES[font as TypeFont];

    Object.entries(fonts).forEach(([key, val]) => {
      document.documentElement.style.setProperty("--font-size-" + key, val);
    });
  };

  const handleSet = (newConfigs: TypeConfigs) => {
    setConfigs(newConfigs);

    localStorage.setItem("theme", newConfigs.theme);
    localStorage.setItem("font", newConfigs.font);

    channel.postMessage(newConfigs);
  };

  useEffect(() => {
    applyTheme(configs.theme);
    applyFont(configs.font);

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
  }, [configs]);

  useEffect(() => {
    channel.onmessage = (event) => {
      setConfigs(event.data);
    };

    return () => {
      channel.close();
    };
  }, []);

  return { value: configs, set: handleSet };
}
