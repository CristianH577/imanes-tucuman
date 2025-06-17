import { useConfigs } from "../../hooks/useConfigs";

import { FONTS_VALUES } from "../../consts/siteConfig";

import SettingsIcon from "@mui/icons-material/Settings";

import ThemeSwitch from "./ThemeSwitch";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

export default function MenuConfigs() {
  const configs = useConfigs();

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

  return (
    <Dropdown
      classNames={{
        content: "min-w-0 p-0 border-2 border-custom1-2 overflow-hidden",
      }}
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          // @ts-ignore
          variant=""
          className="text-neutral-400 hover:scale-110 transition-all"
          aria-label="Configuraciones"
          title="Configuraciones"
        >
          <SettingsIcon className="h-7 w-fit" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Configuraciones"
        closeOnSelect={false}
        classNames={{
          base: "p-0",
        }}
      >
        <DropdownItem key="theme" textValue="tema" onClick={switchTheme}>
          <ThemeSwitch isSelected={configs.value.theme} />
        </DropdownItem>

        <DropdownItem key="font" textValue="fuente" className="p-0">
          <Button
            isIconOnly
            className="uppercase font-bold bg-transparent w-full"
            title="Cambiar tamaño del texto"
            onClick={switchFont}
          >
            {configs.value.font}
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
