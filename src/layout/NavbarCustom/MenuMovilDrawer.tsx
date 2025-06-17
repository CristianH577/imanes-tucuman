import type { TypeRoute } from "../../consts/types";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Divider,
} from "@heroui/react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Redes from "../../components/Redes";
import Logo from "../../components/Logo";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type TypeMenuMovilDrawer = {
  isOpen: boolean;
  NAV_ITEMS: TypeRoute[];
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
};

export default function MenuMovilDrawer({
  isOpen = false,
  setIsOpen,
  NAV_ITEMS,
}: TypeMenuMovilDrawer) {
  const onClose = () => setIsOpen(false);

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      placement="left"
      className={`max-xs:rounded-none w-full xs:max-w-[255px] ps-[3%]`}
      backdrop="transparent"
      classNames={{
        wrapper: "max-xs:ms-[3%]",
        closeButton: "text-2xl top-5 end-3",
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: "-3%",
            // @ts-ignore
            duration: 0.3,
          },
          exit: {
            x: -100,
            opacity: 0,
            // @ts-ignore
            duration: 0.3,
          },
        },
      }}
    >
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader>
              <Logo
                id="menu_movil_logo"
                href="#"
                title="Ir al inicio"
                classNames={{
                  svgA: "h-full w-auto max-h-[44px]",
                }}
              />
            </DrawerHeader>

            <Divider className="w-4/5 self-center" />

            <DrawerBody className="h-fit px-2">
              <List aria-label="Lista de secciones" className="py-0">
                {NAV_ITEMS.map((item) => (
                  <ListItemButton
                    key={item.id}
                    component="a"
                    className="text-custom2 dark:text-custom1 capitalize py-2 hover:shadow-md dark:hover:bg-neutral-500/20"
                    href={`#${item.href}${item?.search || ""}`}
                    onClick={onClose}
                  >
                    {item?.icon && (
                      <ListItemIcon className="text-inherit">
                        <item.icon className="h-8 w-fit" />
                      </ListItemIcon>
                    )}

                    <ListItemText
                      primary={item.label}
                      classes={{ primary: "text-lg font-semibold" }}
                    />
                  </ListItemButton>
                ))}

                <ListItemButton
                  className="text-neutral-400 py-2 hover:shadow-md dark:hover:bg-neutral-500/20 hover:text-foreground "
                  onClick={onClose}
                >
                  <ListItemIcon className="text-inherit">
                    <ArrowBackIcon className="h-8 w-fit" />
                  </ListItemIcon>

                  <ListItemText
                    primary="Cerrar"
                    classes={{ primary: "text-lg font-semibold" }}
                  />
                </ListItemButton>
              </List>

              <Divider className="w-4/5 self-center" />

              <Redes
                className="px-2 gap-6"
                classNames={{
                  link: "hover:text-custom2 dark:hover:text-custom1",
                  icon: "h-8 w-fit",
                }}
              />
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
