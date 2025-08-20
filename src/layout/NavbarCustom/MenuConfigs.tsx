import { useState } from "react";

import { FONTS_VALUES } from "../../consts/siteConfig";

import { useConfigs } from "../../hooks/useConfigs";

import { IconButton, Menu, MenuItem } from "@mui/material";

import ThemeSwitch from "./ThemeSwitch";

import SettingsIcon from "@mui/icons-material/Settings";

export default function MenuConfigs() {
  const configs = useConfigs();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const switchTheme = () => {
    const theme_ = configs.value.theme === "light" ? "dark" : "light";
    configs.set({ ...configs.value, theme: theme_ });
  };

  const switchFont = () => {
    const array = Object.keys(FONTS_VALUES);
    let font_ = configs.value.font;

    let i = array.findIndex((key) => key === configs.value.font);
    i += 1;
    if (i > array.length - 1) i = 0;
    font_ = array[i];

    configs.set({
      ...configs.value,
      font: font_,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="default"
        id="configs-button"
        aria-controls={open ? "Configuraciones" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        title="Configuraciones"
        onClick={handleClick}
      >
        <SettingsIcon
          fontSize="inherit"
          className="text-neutral-500 dark:text-neutral-300"
        />
      </IconButton>

      <Menu
        id="configs-menu"
        anchorEl={anchorEl}
        open={open}
        slotProps={{
          list: {
            "aria-labelledby": "configs-button",
          },
        }}
        onClose={handleClose}
      >
        <MenuItem title="Cambiar tema" onClick={switchTheme}>
          <ThemeSwitch isSelected={configs.value.theme} />
        </MenuItem>

        <MenuItem
          title="Cambiar tamaño del texto"
          className="uppercase font-bold justify-center"
          onClick={switchFont}
        >
          {configs.value.font}
        </MenuItem>
      </Menu>
    </div>
  );
}
